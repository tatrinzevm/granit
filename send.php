<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <title>Repair Design Project</title>
  <?php
    $userName = $_POST['userName'];
    if (isset($_POST['userEmail'])) {$userEmail = $_POST['userEmail'];}
    if(isset($_POST['userPhone'])) {$userPhone = $_POST['userPhone'];}
    if (isset($_POST['userSite'])) {$userSite = $_POST['userSite'];}
    if (isset($_POST['userMessage'])) {$userMessage = $_POST['userMessage'];}
    $formName = $_POST['formName'];
    $content = array (
      "success" => "",
      "error" => ""
    );
    if ($formName == 'modal'):
      $subject = '=?UTF-8?B?'.base64_encode('Новая заявка с сайта').'?=';
      $body = "Имя пользователя: ${userName}, его телефон: ${userPhone}.";
      $content["success"] = "${userName}, Ваша заявка отправлена.<br>Мы свяжемся с Вами по телефону ${userPhone}";
      $content["error"] = "${userName}, к сожалению при отправке Вашей заявки возникла ошибка: ";
    elseif ($formName == 'question'):
      $subject = '=?UTF-8?B?'.base64_encode('Новый вопрос с сайта').'?=';
      $body = "Имя пользователя: ${userName}, его телефон: ${userPhone}, его электронная почта: ${userEmail}, его вопрос: ${userMessage}";
      $content["success"] = "${userName}, Ваш вопрос отправлен.<br>Мы свяжемся с Вами по телефону ${userPhone} или по электронной почте ${userEmail}";
      $content["error"] = "${userName}, к сожалению при отправке Вашей заявки на трансляцию возникла ошибка: ";
    elseif ($formName == 'costCalc'):
      $subject = '=?UTF-8?B?'.base64_encode('Новый запрос на расчет стоимости с сайта').'?=';
      $body = "Имя пользователя: ${userName}, его электронная почта: ${userEmail}, его сайт: ${userSite}, его сообщение: ${userMessage}.";
      $content["success"] = "${userName}, Ваш вопрос отправлен.<br>Мы свяжемся с Вами по телефону ${userPhone} или по электронной почте ${userEmail}";
      $content["error"] = "${userName}, к сожалению при отправке Вашего вопроса возникла ошибка: ";
    endif;
    
    // Load Composer's autoloader
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer\PHPMailer\PHPMailer;

    try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'tatrinzevm.orders@gmail.com';                     // SMTP username
      $mail->Password   = ')%qmPWOR3Qo8';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
      $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

      //Recipients
      $mail->setFrom('tatrinzevm.orders@gmail.com', '=?UTF-8?B?'.base64_encode('Сайт SAYTSPB').'?=');
      $mail->addAddress('tatrinzevm@gmail.com', '=?UTF-8?B?'.base64_encode('Максим').'?=');     // Add a recipient

      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = $subject;
      $mail->Body = $body;

      if ($mail->send()) {
      $result = "success";
      $error = "";
      } else {
        $result = "error";
        $error = $mail->ErrorInfo;
      }
    } catch (Exception $e) {
      
    }
  ?>
</head>
<body>
    <section class="sectionThankYouPage">
      <div class="thankYouPageContainer">
        <div class="thankYouPageContent">
          <?php echo $content[$result].$error.".";?>
        </div>
        <a href="index.html" class="buttonReturn">Вернуться на сайт</a>
      </div>
    </section>
</body>
</html>
