<?php
/**
 * Grant Labs — 상담 신청 SMS 발송
 * 알리고(aligo.in) API 사용
 *
 * ★ 설정 방법:
 *   1. aligo.in 가입 후 API 키 발급
 *   2. 아래 설정값 입력
 *   3. 이 파일을 서버의 /api/ 폴더에 업로드
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ===== 알리고 설정 =====
$ALIGO_KEY     = 'YOUR_ALIGO_API_KEY';   // 알리고 API 키
$ALIGO_USER_ID = 'YOUR_ALIGO_USER_ID';   // 알리고 아이디
$SENDER        = '01059637624';           // 발신 번호 (등록된 번호여야 함)
$RECEIVER      = '01059637624';           // 수신 번호 (본인 핸드폰 번호)
// ======================

// 요청 데이터 파싱
$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

$company  = htmlspecialchars($data['company']  ?? '-', ENT_QUOTES, 'UTF-8');
$name     = htmlspecialchars($data['name']     ?? '-', ENT_QUOTES, 'UTF-8');
$phone    = htmlspecialchars($data['phone']    ?? '-', ENT_QUOTES, 'UTF-8');
$interest = htmlspecialchars($data['interest'] ?? '-', ENT_QUOTES, 'UTF-8');

// SMS 메시지 (90바이트 이내)
$msg = "[Grant Labs 상담신청]\n회사: {$company}\n담당자: {$name}\n연락처: {$phone}\n서비스: {$interest}";

// 알리고 API 호출
$params = [
    'key'      => $ALIGO_KEY,
    'user_id'  => $ALIGO_USER_ID,
    'sender'   => $SENDER,
    'receiver' => $RECEIVER,
    'msg'      => $msg,
    'msg_type' => 'SMS',
    'title'    => 'Grant Labs 상담신청',
];

$ch = curl_init('https://apis.aligo.in/send/');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($params),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => false,
]);

$result = curl_exec($ch);
$error  = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'curl error: ' . $error]);
} else {
    $decoded = json_decode($result, true);
    $success = isset($decoded['result_code']) && $decoded['result_code'] == 1;
    echo json_encode(['success' => $success, 'aligo' => $decoded]);
}
