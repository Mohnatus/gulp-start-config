
<?php require_once($_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/main/include/prolog_before.php"); ?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="windows-1251"/>
    <meta name="viewport"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Page title</title>
    <meta name="description" content="..description"/>
    <link rel="stylesheet" href="/ii/css/style.css"/>
  </head>
  <body>
    <div class="mask" id="mask" style="display: none"></div><!-- AUTH--><?$APPLICATION->IncludeComponent(
        "bitrix:system.auth.form",
        "newLogin",
        Array(
            "REGISTER_URL" => "/login/registration.php",
            "FORGOT_PASSWORD_URL" => "/login/auth.php",
            "PROFILE_URL" => "/login/auth.php",
            "SHOW_ERRORS" => "Y"
        )
    );?><!-- AUTH END-->
<!--REGISTRATION -->
<div class="popup popup-registration hidden"></div>
<!--REGISTRATION END-->
<!-- RESET PASSWORD-->
<div class="popup popup-resetPass hidden"></div>
<div class="popup popup-resetPass_step2 hidden">
<div class="popup__header">
<div class="popup__title">Пароль сброшен</div>
<div class="popup__close"><i class="material-icons">close</i></div>
</div>
<div class="popup__body">
<div class="popup__text">На вашу почту было отправлено письмо с инструкциями по сбросу пароля. Используйте ссылку в этом письме, чтобы продолжить процесс и сбросить пароль.</div>
<div class="popup__text">Если вы не видите письма в своей почте, проверьте другие папки, куда письмо могло быть автоматически отсортировано (например в спам).</div>
</div>
</div>
<!-- RESET PASSWORD END--><script src="/bitrix/templates/t1/js-lib/jquery.validate.min.js"></script>
<script src="/ii/js/auth.js"></script>
  </body>
</html>