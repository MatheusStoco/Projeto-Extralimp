<?php
// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Função para enviar resposta JSON e terminar o script
function send_json_response($status, $message = '') {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- DADOS DO FORMULÁRIO ---
    $nome = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $servico = isset($_POST["service"]) ? trim($_POST["service"]) : 'Não especificado';
    $mensagem = isset($_POST["message"]) ? trim($_POST["message"]) : '';

    // --- CONFIGURAÇÕES DO E-MAIL ---
    $para = "stocom6@gmail.com"; // Seu e-mail de recebimento
    $assunto = "Novo Contato do Site Extralimp - " . $nome;

    // --- VALIDAÇÃO ---
    if (empty($nome) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json_response('error', 'Por favor, preencha todos os campos corretamente.');
    }

    // --- MONTAGEM DO CORPO DO E-MAIL ---
    $corpo_email = "Nome: $nome\n";
    $corpo_email .= "Email: $email\n";
    $corpo_email .= "Serviço de Interesse: $servico\n\n";
    $corpo_email .= "Mensagem:\n$mensagem\n";

    // --- CABEÇALHOS DO E-MAIL ---
    $headers = "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- ENVIO DO E-MAIL ---
    if (mail($para, $assunto, $corpo_email, $headers)) {
        send_json_response('success', 'E-mail enviado com sucesso.');
    } else {
        send_json_response('error', 'Falha ao enviar o e-mail.');
    }

} else {
    // Acesso não permitido via GET
    send_json_response('error', 'Método não permitido.');
}
?>
