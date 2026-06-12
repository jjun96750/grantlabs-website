<?php
/**
 * Grant Labs — 상담 신청 이메일 발송
 * PHP mail() 또는 Gmail SMTP (PHPMailer) 사용
 *
 * ★ 설정 방법:
 *   1. 아래 $TO_EMAIL을 받을 이메일 주소로 변경
 *   2. 호스팅 서버의 /api/ 폴더에 업로드
 *
 * Gmail SMTP를 쓰려면 하단 주석 처리된 PHPMailer 섹션 참고
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ===== 설정 =====
$TO_EMAIL   = 'jjun96750@gmail.com';   // 받을 이메일 주소
$FROM_EMAIL = 'noreply@grantlabs.co.kr'; // 발신 주소 (호스팅 도메인)
$FROM_NAME  = 'Grant Labs 홈페이지';
// ================

// 요청 데이터 파싱
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

$company  = strip_tags($data['company']  ?? '-');
$name     = strip_tags($data['name']     ?? '-');
$phone    = strip_tags($data['phone']    ?? '-');
$interest = strip_tags($data['interest'] ?? '-');
$message  = strip_tags($data['message']  ?? '');

// 이메일 제목
$subject = '=?UTF-8?B?' . base64_encode('[Grant Labs] 상담 신청: ' . $name . ' / ' . $company) . '?=';

// 이메일 본문
$body = "Grant Labs 홈페이지에 새로운 상담 신청이 접수되었습니다.\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━\n";
$body .= "  회사명   : {$company}\n";
$body .= "  담당자   : {$name}\n";
$body .= "  연락처   : {$phone}\n";
$body .= "  관심 서비스 : {$interest}\n";
if ($message) {
    $body .= "  문의 내용 : {$message}\n";
}
$body .= "━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "빠른 시일 내에 연락 부탁드립니다.\n";

// 헤더
$headers  = "From: =?UTF-8?B?" . base64_encode($FROM_NAME) . "?= <{$FROM_EMAIL}>\r\n";
$headers .= "Reply-To: {$phone}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";

$result = mail($TO_EMAIL, $subject, base64_encode($body), $headers);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'mail() 실패 — 호스팅 SMTP 설정 확인 필요']);
}
