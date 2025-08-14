var grecaptchaV2 = document.getElementById("customjslog").getAttribute("data-grecaptchaV2");
var grecaptchaV2Key = document.getElementById("customjslog").getAttribute("data-grecaptchaV2Key");
var grecaptchainvisiblev2 = document.getElementById("customjslog").getAttribute("data-grecaptchainvisiblev2");
var grecaptchainvisiblev2Key = document.getElementById("customjslog").getAttribute("data-grecaptchainvisiblev2Key");
var grecaptchaV3 = document.getElementById("customjslog").getAttribute("data-grecaptchaV3");
var grecaptchaV3Key = document.getElementById("customjslog").getAttribute("data-grecaptchaV3Key");
var signup_captcha_widget;

var signup_first_name = document.getElementById("customjslog").getAttribute("data-fname");
var signup_last_name = document.getElementById("customjslog").getAttribute("data-lname");
var signup_email = document.getElementById("customjslog").getAttribute("data-email");
var warningIcon = '<img src="/images/form-error-icon.svg" alt="error-icon" /> ';

$(window).bind("pageshow", function () {
  // update hidden input field
  var action = $("#action").val(); //check if edit page
  var edit_uid = $("#edit_uid").val();
  var artwork = $("#manual_artwork").val();
  // _coverartmanual
  if (action == "edit" && artwork != edit_uid + "_coverartmanual") {
    $("#manual_artwork").val("");
    if ($("#fangate_style").val() == 1) {
      $("#editCoverartImgLayer").addClass("hide");
    }
  }

  if (action == "create") {
    $("#manual_artwork").val("");
  }

  $("#download_file").val("");
  $("#header_fangate").val("");
});

$(window).load(function () {
  $("#artwork_image_box_loader").hide();
  // use this if you are using id to check
  if ($(".audiopre").length) {
    $(".audiopre").show();
  }
  if ($(".audiocontrol").length) {
    $(".audiocontrol").show();

    if (
      $.cookie("playerspviewhype") &&
      $.cookie("playerspviewhype") == 1 &&
      !$(".player").hasClass("stay_hidden")
    ) {
      $(".player").css("visibility", "visible").hide();
      $(".player").slideDown("fast");
    }
  }
});

$(document).ready(function () {
  /////////////////////////
  ////////HYPE-755/////////
  /////////////////////////
  if (
    window.location.href.indexOf("?upgradetopro") != -1 ||
    window.location.href.indexOf("?upgrade") != -1
  ) {
    $("#upgradetopro").modal("toggle");
  }

  $('#notification_button[href^="?upgrade"]').click(function (e) {
    e.preventDefault();
    $("#custom_onboarding_popup")
      .on("hidden.bs.modal", function () {
        $("body").addClass("modal-open");
      })
      .modal("hide");
    var href = $(this).attr("href");

    $("#upgradetopro").modal("toggle");
    // if (href.indexOf('?') > -1)
    // {
    //     //$(href.substring(0,href.indexOf("?"))).modal('toggle');
    //     $('#upgradetopro').modal('toggle');
    // }else{
    //     $('#upgradetopro').modal('toggle');
    // }
  });

  $("#downloadProcess").click(function () {
    $(".sidebar-buttons, .hype-sidebar-buttons").toggleClass("move-bottom");
    $(".downloadProcess").show().toggleClass("move-bottom-now");
    var maxHeight = Math.max.apply(
      null,
      $("div.fangate-slider-content")
        .map(function () {
          return $(this).height();
        })
        .get()
    );
    $(".carousel-inner").height(maxHeight);
  });

  $(":radio").change(function (event) {
    var dataOn = $(this).data("on");
    var dataOff = $(this).data("off");
    $("." + dataOn).removeClass("hide");
    $("." + dataOff).addClass("hide");

    try {
      if (
        dataOn == "monthly" &&
        $("#plan_monthly,#billing-radio-1").is(":checked")
      ) {
        $("#billing-radio-1,#plan_monthly").prop("checked", true);
        $("#billing-radio-2,#plan_annual").prop("checked", false);
        $(".monthly_plan").removeClass("hide");
        $(".annually_plan").addClass("hide");
      } else if (
        dataOn == "annually" &&
        $("#plan_annual,#billing-radio-2").is(":checked")
      ) {
        $("#billing-radio-1,#plan_monthly").prop("checked", false);
        $("#billing-radio-2,#plan_annual").prop("checked", true);
        $(".monthly_plan").addClass("hide");
        $(".annually_plan").removeClass("hide");
      }
    } catch (e) {}
  });

  if ($("#plan_annual").is(":checked")) {
    var dataOn = "annually";
    var dataOff = "monthly";
    $("." + dataOn).removeClass("hide");
    $("." + dataOff).addClass("hide");

    $(".monthly_plan").addClass("hide");
    $(".annually_plan").removeClass("hide");
  } else if ($("#plan_monthly").is(":checked")) {
    $(".monthly").removeClass("hide");
    $(".annually").addClass("hide");

    $(".monthly_plan").removeClass("hide");
    $(".annually_plan").addClass("hide");
  }

  if ($("#billing_pro-radio-2").is(":checked")) {
    var dataOn = "annually_pro";
    var dataOff = "monthly_pro";
    $("." + dataOn).removeClass("hide");
    $("." + dataOff).addClass("hide");
  }

  if ($("#billing_pro-radio-1").is(":checked")) {
    $("#billing-radio-1").prop("checked", true);
    $("#billing-radio-2").prop("checked", false);
    $(".monthly_pro").removeClass("hide");
    $(".annually_pro").addClass("hide");
  }

  if ($("#billing-radio-2").is(":checked")) {
    var dataOn = "annually_plan";
    var dataOff = "monthly_plan";
    $("." + dataOn).removeClass("hide");
    $("." + dataOff).addClass("hide");
  }

  $("#link_star").on("click", function (event) {
    $(".content-star").removeClass("hide");
    $(".content-vip").addClass("hide");
    $(".link_vip").removeClass("link_starvip_bold");
    $(".link_star").addClass("link_starvip_bold");
  });
  $("#link_vip").on("click", function (event) {
    $(".content-star").addClass("hide");
    $(".content-vip").removeClass("hide");
    $(".link_vip").addClass("link_starvip_bold");
    $(".link_star").removeClass("link_starvip_bold");
  });

  try {
    if (
      $("#link_vip").hasClass("link_starvip_bold") == false &&
      $("#link_star").hasClass("link_starvip_bold") == false
    ) {
      $(".link_star").addClass("link_starvip_bold");
    }
  } catch (e) {}

  $(".startvip_signup_button").on("click", function (event) {
    var dataType = $(this).data("selectplan");
    if (dataType == "vip") {
      $(".content-star").addClass("hide");
      $(".content-vip").removeClass("hide");
      $(".link_vip").addClass("link_starvip_bold");
      $(".link_star").removeClass("link_starvip_bold");
    } else {
      $(".content-star").removeClass("hide");
      $(".content-vip").addClass("hide");
      $(".link_vip").removeClass("link_starvip_bold");
      $(".link_star").addClass("link_starvip_bold");
    }
  });

  //customersurvey
  $("body").on("click", "#complete", function () {
    var id = $(this).attr("data-id");
    $.ajax({
      type: "POST",
      url: "/updateCustomerSurvey",
      data: {
        customer_survey_page: true,
        operation_name: "complete",
        user_id: id,
      },
      success: function (result) {
        //$('#customer-survey').toggle('hide');
      },
    });
  });

  //howItWorks

  $(".howItWorks").click(function (event) {
    var checks = false;

    $.ajax({
      type: "POST",
      url: "/ajax-how-it-works",
      dataType: "json",
      async: false,
      success: function (res) {
        checks = true;
      },
    });
    return checks;
  });

  $("body").on("click", ".error-msg", function () {
    // $('.error-msg').hide();
    $(this).hide();
  });

  $("body").on("click", ".hype-invalid-feedback", function () {
    $(this).hide().parent().removeClass('is-invalid');
  });

  $("body").on("click", "#code-go", function () {
    $("#confirmation-pending-popup").modal("hide");
    $("#confirmation-password-popup").modal("hide");
  });

  $("body").on("click", "#invalid-user-go", function () {
    $("#invalid-user-popup").modal("hide");
    $("#invalid-social-popup").modal("hide");
  });

  $("body").on("click", ".invalid-user-go", function () {
    $("#invalid-user-popup").modal("hide");
    $("#invalid-social-popup").modal("hide");
  });

  $("#searchclear").click(function () {
    $("#"+signup_email).val("");
    $("#updated_email").val("");
  });

  var resend = 1;
  $("body").on("click", "#resend", function () {
    if (resend == 1) {
      $("#resend_form").show();
      resend = 2;
    } else {
      $("#resend_form").hide();
      resend = 1;
    }
  });

  $("#update-user-email").submit(function (event) {
    event.preventDefault();
    if ($("#updated_email").val() == "") {
      jQuery(".name_error_updated_email").show();
      jQuery(".name_error_updated_email")
        .html("Please enter your email.")
        .parent()
        .addClass("has-error");
      return false;
    } else if ($("#updated_email").val() != "") {
      jQuery(".name_error_updated_email").hide();
      if (validateEmail($("#updated_email").val())) {
        var formData = $(this).serialize();

        $.ajax({
          dataType: "json",
          type: "POST",
          async: true,
          url: "/update_user",
          data: formData,
          success: function (returnData) {
            if (returnData.action == true) {
              //window.location.reload();
              $.notify("Settings updated successfully", { pos: "top-right" });
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            } else {
              jQuery(".name_error_updated_email").show();
              jQuery(".name_error_updated_email")
                .html(
                  "Email address is already associated with a different user."
                )
                .parent()
                .addClass("has-error");
            }
          },
        });
      } else {
        jQuery(".name_error_updated_email").show();
        jQuery(".name_error_updated_email")
          .html("Oops! That email looks a little off. Try again?")
          .parent()
          .addClass("has-error");
        jQuery("#loader").hide();
        return false;
      }
    }
  });

  $("#user_details_update").submit(function (event) {
    event.preventDefault();
    if ($("#updated_email").val() == "") {
      jQuery(".name_error_updated_email").show();
      jQuery(".name_error_updated_email")
        .html("Please enter your email.")
        .parent()
        .addClass("has-error");
      return false;
    } else if (
      $("#updated_email").val() != "" &&
      !validateEmail($("#updated_email").val())
    ) {
      jQuery(".name_error_updated_email").show();
      jQuery(".name_error_updated_email")
        .html("Oops! That email looks a little off. Try again?")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
      return false;
    } else {
      jQuery(".name_error_updated_email").hide();
      if (validateEmail($("#updated_email").val())) {
        $("#current_password_prompt").modal({ show: "true" });
      } else {
        jQuery(".name_error_updated_email").show();
        jQuery(".name_error_updated_email")
          .html("Oops! That email looks a little off. Try again?")
          .parent()
          .addClass("has-error");
        jQuery("#loader").hide();
        return false;
      }
    }
  });


  $("#update-user-twofactor").submit(function (event) {
    event.preventDefault();
    if ($('#checkbox-twofactor-phone').is(':checked') && $("#updated_phone").val() == "") {
      jQuery(".name_error_updated_phone").show();
      jQuery(".name_error_updated_phone")
          .html("Please enter your phone.")
          .parent()
          .addClass("has-error");
      return false;
    } else {
      jQuery(".name_error_updated_phone").hide();
      $("#methodID").val('twofactor');
      $("#current_password_prompt").modal({ show: "true" });
    }
  });


  $("#authentication_prompt").submit(function (event) {
    event.preventDefault();
    if ($("#login_password").val() == "") {
      jQuery(".name_error_password").show();
      jQuery(".name_error_password")
        .html("Please enter your password.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
      return false;
    } else {
      var method = $("#methodID").val();
      if (
        method == "delete_account" ||
        method == "remove_user_custom_domain" ||
        method == "add_user_custom_domain" ||
        method.match(/tracking/g)
      ) {
        $("#security_check").val($("#login_password").val());
        var formData = [
          $("#authentication_prompt").serialize(),
          $.param({ security_check: $("#login_password").val() }),
        ].join("&");
        $.ajax({
          dataType: "json",
          type: "POST",
          async: true,
          url: "/recheck",
          data: formData,
          success: function (returnData) {
            if (
              returnData.action == false &&
              returnData.error == "AUTHENTICATION FAIL"
            ) {
              jQuery(".name_error_password").show();
              jQuery(".name_error_password")
                .html("Please enter your correct password.")
                .parent()
                .addClass("has-error");
              jQuery("#loader").hide();
              return false;
            } else if (returnData.action == false && returnData.error == "") {
              window.location.reload();
            } else {
              if (method == "delete_account") {
                $("#dlet").submit();
              }
              if (method == "remove_user_custom_domain") {
                removeUserCustomDomain(); // custom-domain.js
              }
              if (method == "add_user_custom_domain") {
                security_check_for_domain = true;
                addUserCustomDomain(); // custom-domain.js
              }
              if (method.match(/tracking/g)) {
                try {
                  var string = method;
                  var res = string.split("-");

                  if (typeof res[1] != "undefined") {
                    tracking_tool_action = res[1];
                  }
                  if (typeof res[2] != "undefined") {
                    tracking_tool_id = res[2];
                  }
                  security_check_for_tracking = true;
                  addtrackingtool(tracking_tool_id, tracking_tool_action);
                } catch (error) {
                  $.notify("OOPS!! Something wrong,Please try again later", {
                    pos: "top-right",
                  });
                }
              }
            }
          },
        });
      } else if (method == 'twofactor')  {
        jQuery(".name_error_password").hide();
        var formData = [
            $("#update-user-twofactor").serialize(),
            $.param({ password: $("#login_password").val() }),
        ].join("&");
        //alert(formData);
        $.ajax({
            dataType: "json",
            type: "POST",
            async: true,
            url: "/update_user_twofactor",
            data: formData,
            success: function (returnData) {
              if (returnData.action == true) {
                $.notify("Two factor updated successfully", { pos: "top-right" });
                jQuery("#current_password_prompt").modal("hide");
                setTimeout(function () {
                  window.location.reload();
                }, 2000);
              } else if (
                  returnData.action == false &&
                  returnData.error == "AUTHENTICATION FAIL"
              ) {
                jQuery(".name_error_password").show();
                jQuery(".name_error_password")
                    .html("Please enter your correct password.")
                    .parent()
                    .addClass("has-error");
                jQuery("#loader").hide();
                return false;
              } else if (returnData.action == false && returnData.error == "") {
                window.location.reload();
              } else {
                jQuery("#loader").hide();
                return false;
              }
            },
          });
      } else {
        jQuery(".name_error_password").hide();
        if (validateEmail($("#updated_email").val())) {
          //var formData = $('#user_details_update').serialize();
          var formData = [
            $("#user_details_update").serialize(),
            $.param({ password: $("#login_password").val() }),
          ].join("&");
          //alert(formData);
          $.ajax({
            dataType: "json",
            type: "POST",
            async: true,
            url: "/update_user_email",
            data: formData,
            success: function (returnData) {
              if (returnData.action == true) {
                $.notify("Settings updated successfully", { pos: "top-right" });
                jQuery("#current_password_prompt").modal("hide");
                setTimeout(function () {
                  window.location.reload();
                }, 2000);
              } else if (
                  returnData.action == false &&
                  returnData.error == "EMAIL_RATE_ISSUE"
              ) {
                jQuery("#current_password_prompt").modal("hide");
                jQuery(".name_error_updated_email").show();
                jQuery(".name_error_updated_email")
                    .html(
                        "You have made too many attempts to alter your email address. Please log out and log back in to continue attempting this."
                    )
                    .parent()
                    .addClass("has-error");
                jQuery("#loader").hide();
                return false;
              } else if (
                returnData.action == false &&
                returnData.error == "AUTHENTICATION FAIL"
              ) {
                jQuery(".name_error_password").show();
                jQuery(".name_error_password")
                  .html("Please enter your correct password.")
                  .parent()
                  .addClass("has-error");
                jQuery("#loader").hide();
                return false;
              } else if (returnData.action == false && returnData.error == "") {
                window.location.reload();
              } else {
                jQuery("#current_password_prompt").modal("hide");
                jQuery(".name_error_updated_email").show();
                jQuery(".name_error_updated_email")
                  .html(
                    "Email address is already associated with a different user!"
                  )
                  .parent()
                  .addClass("has-error");
                jQuery("#loader").hide();
                return false;
              }
            },
          });
        } else {
          jQuery(".name_error_updated_email").show();
          jQuery(".name_error_updated_email")
            .html("Oops! That email looks a little off. Try again?")
            .parent()
            .addClass("has-error");
          jQuery("#loader").hide();
          return false;
        }
      }
    }
  });

  $("body").on("click", ".authentication_cancel_button", function () {
    jQuery("#current_password_prompt").modal("hide");
    jQuery(".name_error_password").hide();
    jQuery(".name_error_password").parent().removeClass("has-error");
    jQuery("#login_password").val("");
  });

  $("#update-user-password").submit(function (event) {
    event.preventDefault();

    var use_captcha = $("#use_captcha").val();

    var captchaResponse = "";
    if (use_captcha == 1) {
      if (window.grecaptcha) {
        try {
          captchaResponse = grecaptcha.getResponse();
        } catch (ec) {
          $("#use_captcha").val(0);
          use_captcha = 0;
        }
      } else {
        $("#use_captcha").val(0);
        use_captcha = 0;
      }
    }
    try {
      $("#error-captcha").remove();
    } catch (ec) {}

    if (
      $("#existing_password").val() == "" &&
      $("#password_exist_dev").hasClass("hide") == false
    ) {
      event.preventDefault();
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").hide();
      jQuery(".name_error_existing_password").show();
      jQuery(".name_error_existing_password")
        .html("Please enter your existing password.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if ($("#new_password").val() == "") {
      event.preventDefault();
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").show();
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_password")
        .html("Please enter your new password.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if (
      $("#new_password").val() != "" &&
      ($("#new_password").val().length < 6 ||
        $("#new_password").val().length > 30)
    ) {
      event.preventDefault();
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").show();
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_password")
        .html("Please enter a password containing 6 to 30 characters.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if ($("#updated_password").val() == "") {
      event.preventDefault();
      jQuery(".name_error_updated_password").hide();
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_confirm_password").show();
      jQuery(".name_error_updated_confirm_password")
        .html("Please enter your new password here again.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if (/\s/.test($("#new_password").val())) {
      event.preventDefault();
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").show();
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_password")
        .html("Please enter a password without spaces.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if ($("#new_password").val() != $("#updated_password").val()) {
      event.preventDefault();
      jQuery(".name_error_updated_password").hide();
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_confirm_password").show();
      jQuery(".name_error_updated_confirm_password")
        .html("Oops! Your passwords don't match. Please try again.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
    } else if (use_captcha == 1 && captchaResponse.length == 0) {
      event.preventDefault();
      jQuery("#cap_html_element").addClass("form-relative has-error");
      jQuery("#error-captcha").remove();
      jQuery("#cap_html_element").append(
        "<div id='error-captcha' class='forget_error_email error-msg' style='display: block;'>Please verify that you are not a robot.</div>"
      );
      return false;
    } else if ($("#new_password").val() != "") {
      var formData = $(this).serialize();

      $.ajax({
        dataType: "json",
        type: "POST",
        async: true,
        evalScripts: true,
        url: "/update_user_password",
        data: formData,
        success: function (returnData) {
          if (returnData.action == true) {
            $("#user-password").modal("hide");
            $("#confirmation-password-popup").modal({
              show: "true",
              backdrop: "static",
              keyboard: false,
            });
            $("#edit_password").show();
            $("#edit_password_screen").hide();
            $("#password_exist_dev").removeClass("hide");
            window.location.href = "/accountsettings";
          } else {
            if (returnData.error == "OLD_MATCH") {
              sErrorType = "OLD_MATCH";
              sError =
                "Your new password must be different from your previous password!";
            } else {
              sErrorType = "NO_MATCH";
              sError = "Existing password is incorrect!";
            }
            if (
              returnData.set_to_use_captcha &&
              returnData.set_to_use_captcha == 1
            ) {
              //
              $("#use_captcha").val(1);
              $("#set_to_use_captcha").removeClass("hide");
              // show captcha & clear it
              try {
                var sitekey = returnData.cap_key;
                grecaptcha.render("cap_html_element", {
                  sitekey: sitekey,
                });
              } catch (ec) {
                try {
                  if (window.grecaptcha) {
                    grecaptcha.reset();
                  }
                } catch (ecr) {}
              }
              //
              errorDisplay(sErrorType, sError);
              //
            } else {
              // refresh the captcha
              try {
                if (window.grecaptcha) {
                  grecaptcha.reset();
                }
              } catch (ec) {}
              if (returnData.error_value == 2) {
                //security captcha show error and clear it
                jQuery("#cap_html_element").addClass("form-relative has-error");
                jQuery("#error-captcha").remove();
                jQuery("#cap_html_element").append(
                  "<div id='error-captcha' class='forget_error_email error-msg' style='display: block;'>Please verify that you are not a robot.</div>"
                );
                return false;
              } else {
                errorDisplay(sErrorType, sError);
              }
            }
          }
        },
        error: function () {
          jQuery(".name_error_updated_confirm_password").hide();
          jQuery(".name_error_updated_password").hide();
          jQuery(".name_error_existing_password").show();
          jQuery(".name_error_existing_password")
            .html(
              "Your session may have expired. Please refresh the browser and try again."
            )
            .parent()
            .addClass("has-error");
          jQuery("#loader").hide();
        },
      });
    }
  });
  function errorDisplay(sErrorType, sError) {
    if (sErrorType == "OLD_MATCH") {
      jQuery(".name_error_existing_password").hide();
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").show();
      jQuery(".name_error_updated_password")
        .html(sError)
        .parent()
        .addClass("has-error");
    } else {
      jQuery(".name_error_updated_confirm_password").hide();
      jQuery(".name_error_updated_password").hide();
      jQuery(".name_error_existing_password").show();
      jQuery(".name_error_existing_password")
        .html(sError)
        .parent()
        .addClass("has-error");
    }
  }

  /*
        sign-up form in popup
    */
  $("#"+signup_email).on("keypress", function (event) {
    $("#verified").val(0);
  });

  $("#signup_form").on("submit", function (e) {

    var isSignupFormValid = validateSignupForm();
    if (isSignupFormValid) {
      if (grecaptchainvisiblev2 == 1 || grecaptchaV3 == 1) {
        try {
          grecaptcha.execute(signup_captcha_widget);
          return false;
        } catch(ec){
          console.log(ec)
        }
      } else {
        $("#signup_form_button").addClass('hype-loading-btn').prop('disabled', true);
      }
    }
    return isSignupFormValid;
  });

  $("#signup_partnership_form").on("submit", function (e) {
    // e.preventDefault();
    var formData = $(this).serialize();
    var use_captcha = $("#use_captcha").val();
    if (use_captcha == 1) {
      var captchaResponse = grecaptcha.getResponse();
    }
    //else{
    //     var agree  = $('#confirm_checkbox').val();
    // }
    var agree = $("#confirm_checkbox").val();

    if (use_captcha == 1 && captchaResponse.length == 0) {
      e.preventDefault();
      $(
        ".term_error,.name_error_signup_email,.name_error_signup_password"
      ).hide();
      $(".security-captcha").addClass("form-relative has-error");
      $("#error-captcha").remove();
      $(".security-captcha").append(
        "<div id='error-captcha' class='name_error_email error-msg' style='display: block;'>Please verify that you are not a robot.</div>"
      );
      return false;
    } else if (!$("#confirm_checkbox").is(":checked")) {
      e.preventDefault();
      jQuery(".name_error_signup_email").hide();
      jQuery(".name_error_signup_password").hide();
      $(".term_error").show();
      $(".term_error")
        .html("Please accept our terms and conditions.")
        .parent()
        .addClass("has-error");
      return false;
    } else {
      return true;
    }
  });

  // UDPATE USER DATA FOR MIGRATION
  $("#update-user-detail").on("submit", function (event) {
    event.preventDefault();
    if ($("#signup_email").val() == "") {
      event.preventDefault();
      jQuery(".name_error_signup_email").show();
      jQuery(".name_error_signup_password").hide();
      $(".term_error").hide();
      jQuery(".name_error_signup_email")
        .html("Please enter your email address.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
      $("#signup_email").focus();
      return false;
    } else if ($("#signup_password").val() == "") {
      event.preventDefault();
      jQuery(".name_error_signup_email").hide();
      jQuery(".name_error_signup_password").show();
      jQuery(".name_error_signup_password")
        .html("Please enter your password.")
        .parent()
        .addClass("has-error");
      $("#signup_password").focus();
      jQuery("#loader").hide();
    } else if ($("#signup_email").val() != "") {
      jQuery(".name_error_signup_email").hide();
      jQuery(".name_error_signup_password").hide();
      var sEmail = $("#signup_email").val().trim();

      if (validateEmail(sEmail)) {
        event.preventDefault();

        var formData = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/ajax-migrate-user-update",
          dataType: "json",
          data: formData,
          async: false,
          success: function (res) {
            if (res.action == true) {
              window.location.href = "/dashboard";
            } else {
              if (res.error == "PASSWORD_SPACES") {
                jQuery(".name_error_signup_email").hide();
                jQuery(".name_error_signup_password").show();
                jQuery(".name_error_signup_password")
                  .html("Password cannot contain spaces.")
                  .parent()
                  .addClass("has-error");
              } else if (res.error == "PASSWORD_MIN") {
                jQuery(".name_error_signup_email").hide();
                jQuery(".name_error_signup_password").show();
                jQuery(".name_error_signup_password")
                  .html("Password must be at least 6 characters.")
                  .parent()
                  .addClass("has-error");
              } else {
                jQuery(".name_error_signup_password").hide();
                jQuery(".name_error_signup_email").show();
                jQuery(".name_error_signup_email")
                  .html(
                    "Oops! This email address is already in use. Please enter a unique email address."
                  )
                  .parent()
                  .addClass("has-error");
              }
            }
          },
          error: function (res) {
            var errors = res.responseJSON;
            $("#signup-error")
              .html("Something is wrong! Please try again.")
              .removeClass("hidden")
              .fadeIn("slow");
          },
        });
        return false;
      } else {
        event.preventDefault();
        $("#signup_email").focus();
        jQuery(".name_error_signup_password").hide();
        jQuery(".name_error_signup_email").show();
        jQuery(".name_error_signup_email")
          .html("Oops! That email looks a little off. Try again?")
          .parent()
          .addClass("has-error");
        jQuery("#loader").hide();
        return false;
      }
    }
  });
  // HYPE-1151
  $("#download_info_request").click(function () {
    $.ajax({
      type: "POST",
      url: "/downloadshareddata/save",
      dataType: "json",
      data: {},
      success: function (returnData, textStatus) {
        if (returnData.action == 0 && returnData.error == 'try-again-later') {
          $.notify(
            "Do check your spam folder if it doesn't arrive in your inbox or try after few hours.",
            { pos: "top-right" }
          );
        }
        if (returnData.action == 1) {
          $.notify(
            "Email with download link will be sent shortly. Please check your inbox.",
            { pos: "top-right" }
          );
        }
      },
    });

    return false;
  });
  // Resend email confrimation code
  $("#resend_form-popup").submit(function (event) {
    event.preventDefault();

    if ($("#verify_email").val() == "") {
      jQuery(".name_error_verify_email").show();
      jQuery(".name_error_verify_email")
        .html("Please enter your email address.")
        .parent()
        .addClass("has-error");
      jQuery("#loader").hide();
      return false;
    } else if ($("#verify_email").val() != "") {
      jQuery(".name_error_verify_email").hide();
      var sEmail = $("#verify_email").val().trim();
      if (validateEmail(sEmail)) {
        $.ajax({
          dataType: "json",
          type: "POST",
          async: true,
          evalScripts: true,
          url: "/resend_confirmation",
          data: { email: $("#verify_email").val() },
          success: function (returnData, textStatus) {
            if (returnData.action == true) {
              // window.location.href="/dashboard";
              $("#confirmation-pending-popup").modal("hide");
            } else {
              jQuery(".name_error_verify_email").show();
              jQuery(".name_error_verify_email")
                .html(
                  "Oops! This email address is already in use. Please enter a unique email address."
                )
                .parent()
                .addClass("has-error");
            }
          },
        });
      } else {
        jQuery(".name_error_verify_email").show();
        jQuery(".name_error_verify_email")
          .html("Oops! That email looks a little off. Try again?")
          .parent()
          .addClass("has-error");
        jQuery("#loader").hide();
        return false;
      }
    }
  });

  //show overylay in fanaction page.
  //$('#overlay-modal-box').modal({show: 'true', backdrop: 'static', keyboard: false});
  //$('#email-overlay-popup').modal({show: 'true', backdrop: 'static', keyboard: false});

  $(".share-fb-btn").on("click", function (e) {
    e.preventDefault();
    var url = $(this).attr("url");

    if (url !== "" && url !== "undefined") {
      FB.ui(
        {
          method: "share",
          href: url,
        },
        function () {}
      );
    }
  });

  //accountSettings
  $(".user-email").click(function () {
    $("#edit_email").hide();
    $("#edit_email_screen").show();
    if ($("#edit_twofactor")) {
      $("#edit_twofactor").show();
      $("#edit_twofactor_screen").hide();
    }
    $("#edit_password").show();
    $("#edit_password_screen").hide();
  });

  $("body").on("click", "#cancel_user_email", function () {
    $("#edit_email").show();
    $("#edit_email_screen").hide();
    $(".name_error_updated_email").hide();
    $(".name_error_updated_email").parent().removeClass("has-error");
  });

  $(".user-password").click(function () {
    $("#edit_password").hide();
    $("#edit_password_screen").show();
    if ($("#edit_twofactor")) {
      $("#edit_twofactor").show();
      $("#edit_twofactor_screen").hide();
    }
    $("#edit_email").show();
    $("#edit_email_screen").hide();
  });

  $(".user-twofactor").click(function () {
    $("#edit_password").show();
    $("#edit_password_screen").hide();
    if ($("#edit_twofactor")) {
      $("#edit_twofactor").hide();
      $("#edit_twofactor_screen").show();
    }
    $("#edit_email").show();
    $("#edit_email_screen").hide();
  });

  $("body").on("click", "#cancel_user_twofactor", function () {
    $("#edit_twofactor").show();
    $("#edit_twofactor_screen").hide();
  });

  $("body").on("click", "#cancel_user_password", function () {
    $("#edit_password").show();
    $("#edit_password_screen").hide();
    $(
      ".name_error_existing_password, .name_error_updated_password, .name_error_updated_confirm_password"
    ).hide();
    $(
      ".name_error_existing_password, .name_error_updated_password, .name_error_updated_confirm_password"
    )
      .parent()
      .removeClass("has-error");
  });

  $("body").on("click", ".new-promotion-options a", function () {
    //type = $('.new-promotion-options li.selected a').attr('id');
    type = $(this).attr("id");
    //promo_type_id = $('.new-promotion-options li.selected a').attr('data-id');
    promo_type_id = $(this).attr("data-id");
    fan_gate_id = $("#promotion_fan_gate_id").val();
    user_id = $("#promotion_user_id").val();
    uid = $("#promotion_uid").val();
    //if(promo_type_id != 2){
    $.ajax({
      type: "POST",
      url: "/updatePromotion",
      async: true,
      data: {
        promo_type_id: promo_type_id,
        fan_gate_id: fan_gate_id,
        user_id: user_id,
      },
      success: function (res) {
        if (res.status === "T") {
          if (promo_type_id == 1) {
            var successUrl = "/gate/share/" + uid;
            window.location.href = successUrl;
          } else if (promo_type_id == 4) {
            var successUrl = "/gate/share/" + uid;
            //window.location.href = successUrl;
          } else if (promo_type_id == 3) {
            var successUrl = "/gate/share/" + uid;
            window.location.href = successUrl;
          } else {
            //var successUrl = '/gate/promotiontype/'+uid;
            var successUrl = "/gate/share/" + uid;
            window.location.href = successUrl;
          }
        }
      },
    });
  });

  $("body").on("click", ".promotion-opt-back", function () {
    $("ul#first").removeClass("hide");
    $("ul#second").addClass("hide");
    $(".promotion-opt-back").addClass("hide");
    $("#promo").closest("li").addClass("selected");
  });

  // upgrade the tooltip counts and clear
  //
  $("body").on("click", ".upgrade_tooltip_toggle", function () {
    //
    var tooltip_value = $(this).attr("data-tooltipvalue");
    //
    $.ajax({
      type: "POST",
      url: "/upgradetooltipupdate",
      async: true,
      data: { tooltipvalue: tooltip_value },
      success: function (res) {
        // close the upgrade tooltip modal
        $(".upgrade-tooltip-content").addClass("hide");
      },
    });
  });

  
});
// spotlight book HYPE-341
// AJAX call to check The next available SPOTLIGHT promotion date
function get_spotlight_dates() {
  var num_days = $("#num_days").val();
  var fangate = $("#spotlight_fangate").val();
  var is_music_link = 0;
  var dest_link = "";
  if (fangate != "") {
    is_music_link = $("#spotlight_fangate").find(":selected").data("musiclink");
    dest_link = $("#spotlight_fangate").find(":selected").data("destlink");
  }
  // hide destination link if not a music link
  try {
    if (is_music_link == 0) {
      $("#destination_div").addClass("hide");
    } else {
      $("#destination_div").removeClass("hide");
      $("#destination_url").val(dest_link);
    }
    $("#destination_url_error").hide();
    $("#destination_url").removeClass("has-error");
    $("div.select").removeClass("has-error");
  } catch (e) {
    //
  }
  //
  if (num_days > 0 && num_days <= 30) {
    $("#num_days_loader").show();
    $.ajax({
      type: "POST",
      url: "/spotlight-dates-availability",
      dataType: "json",
      data: { num_days: num_days, fangate: fangate },
      success: function (response) {
        if (response.action) {
          if (response.available) {
            var string = "date is currently ";
            if (num_days > 1) {
              string = "dates are currently ";
            }
            if (num_days > 2) {
              string +=
                "from " +
                response.date_format[0] +
                " to " +
                response.date_format[num_days - 1];
            } else if (num_days > 1) {
              string +=
                response.date_format[0] +
                " and " +
                response.date_format[num_days - 1];
            } else {
              string += response.date_format[0] + ".";
            }

            $("#available_date_txt").text(string);
            if (num_days == 1) {
              $("#duration_txt").text(num_days + " day");
            } else {
              $("#duration_txt").text(num_days + " days");
            }
            $("#spotlight_price,.spotlight_price").text(
              "$" + response.spotlight_price
            );
            // paypal form
            $("#paypal_spotlight_quantity,#paypal_spotlight_custom_days").val(
              num_days
            );
            $("#paypal_spotlight_days").val(num_days);
          } else {
            $("#spotlight_number").val("");
          }
        }
        $("#num_days_loader").hide();
      },
      error: function () {
        $("#num_days_loader").hide();
        return false;
      },
    });
  } else {
    $("#num_days").val(1);
    get_spotlight_dates();
  }
}

function spotlight_progress() {
  var trx_id = $("#trx_id").val();
  var user_id = $("#user_id").val();
  var msg = "";
  $.ajax({
    type: "POST",
    url: "/spotlight/validate-transaction",
    dataType: "json",
    data: { trx_id: trx_id, user_id: user_id },
    success: function (response) {
      if (response.action) {
        msg = $("#success_msg").html();
        if (1 == response.days) {
          msg = msg.replace(
            "--date--",
            "date is: <b>" + response.date1 + "</b>"
          );
        } else if (2 == response.days) {
          msg = msg.replace(
            "--date--",
            "dates are <b>" +
              response.date1 +
              "</b> and <b>" +
              response.date2 +
              "</b>"
          );
        } else {
          msg = msg.replace(
            "--date--",
            "dates are from <b>" +
              response.date1 +
              "</b> to <b>" +
              response.date2 +
              "</b>"
          );
        }
        $("#payment_status_msg").html(msg);
        $(".blog-promotion-content").removeClass("hide");
        $(".loading-data").remove();
      } else {
        spotlight_progress_counter++;
        if (spotlight_progress_counter < 30) {
          setTimeout(spotlight_progress, 3000);
          $(".blog-promotion-content").addClass("hide");
        } else {
          // redirect to some error page?
        }

        // msg = $("#pending_msg").html();
      }
    },
  });
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function removeLoginCss() {
  jQuery(".name_error_password").hide();
  jQuery(".name_error_email").hide();
  jQuery(".name_error_password").parent().removeClass("is-invalid");
  jQuery(".name_error_email").parent().removeClass("is-invalid");
}

function removeSignupCss() {
  jQuery(".name_error_signup_password").hide();
  jQuery(".name_error_signup_email").hide();
  jQuery(".name_error_signup_password").parent().removeClass("has-error").removeClass("is-invalid");
  jQuery(".name_error_signup_email").parent().removeClass("has-error").removeClass("is-invalid");
  $(".term_error").hide();
  $(".term_error").parent().removeClass("has-error").removeClass("is-invalid");
}

function checkUniqueLoginEmail() {
  $("#fb-message-error").addClass("hidden");
  if ($("#"+signup_email).val() == "") {
    jQuery(".name_error_signup_email").show();
    jQuery(".name_error_signup_password, .term_error, #error-captcha",).hide().parent().removeClass("is-invalid");
    $(".term_error").hide();
    jQuery(".name_error_signup_email")
      .html(warningIcon + "Please enter your email address.")
      .parent()
      .addClass("is-invalid");
    jQuery("#loader").hide();
    return false;
  } else if ($("#"+signup_email).val() != "") {
    jQuery(".name_error_signup_email").hide().parent().removeClass("is-invalid");
    jQuery(".name_error_signup_password").hide().parent().removeClass("is-invalid");
    var sEmail = $("#"+signup_email).val().trim();
    if (validateEmail(sEmail)) {
      jQuery("#verified").val(1);
      return true;
    } else {
      jQuery(".name_error_signup_password").hide().parent().removeClass("is-invalid");
      $(".term_error").hide().parent().removeClass("is-invalid");
      jQuery(".name_error_signup_email").show();
      jQuery(".name_error_signup_email")
        .html(warningIcon + "Oops! That email looks a little off. Try again?")
        .parent()
        .addClass("is-invalid");
      jQuery("#loader").hide();
      return false;
    }
  }
}

function removeInfoUpdateCss() {
  jQuery(".name_error_signup_email").hide();
  jQuery(".name_error_signup_password").hide();
  jQuery(".name_error_signup_email").parent().removeClass("has-error");
  jQuery(".name_error_signup_password").parent().removeClass("has-error");
}

function removeVerifyEmailCss() {
  jQuery(".name_error_verify_email").hide();
  jQuery(".name_error_verify_email").parent().removeClass("has-error");
}

//accountSettings
function removeAccPassCss() {
  jQuery(".name_error_updated_confirm_password").hide();
  jQuery(".name_error_updated_password").hide();
  jQuery(".name_error_existing_password").hide();
  jQuery(".name_error_updated_confirm_password")
    .parent()
    .removeClass("has-error");
  jQuery(".name_error_updated_password").parent().removeClass("has-error");
  jQuery(".name_error_existing_password").parent().removeClass("has-error");
}

function removeAccEmailCss() {
  jQuery(".name_error_updated_email").hide();
  jQuery(".name_error_updated_email").parent().removeClass("has-error");
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* function to copy the text to clipboard */
function copyToClipboard(element, notifyText) {
  var input = document.getElementById(element);
  var isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
  if (notifyText == undefined) {
    notifyText = "Link copied to clipboard";
  }

  if (isiOSDevice) {
    var editable = input.contentEditable;
    var readOnly = input.readOnly;

    input.contentEditable = true;
    input.readOnly = false;

    var range = document.createRange();
    range.selectNodeContents(input);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    input.setSelectionRange(0, 999999);
    input.contentEditable = editable;
    input.readOnly = readOnly;
    document.execCommand("copy");
    $.notify(notifyText, { pos: "top-right" });
  } else {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $.notify(notifyText, { pos: "top-right" });
    $temp.remove();
  }
}

function copyToClipboardModify(element, notifyText) {
  var input = $('#' + element);
  var isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
  if (notifyText == undefined) {
    notifyText = "Link copied to clipboard";
  }

  if (isiOSDevice) {
    var editable = input.contentEditable;
    var readOnly = input.readOnly;

    input.contentEditable = true;
    input.readOnly = false;

    var range = document.createRange();
    range.selectNodeContents(input);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    input.setSelectionRange(0, 999999);
    input.contentEditable = editable;
    input.readOnly = readOnly;
    document.execCommand("copy");
    $.notify(notifyText, { pos: "top-right" });
  } else {
    
    var textToCopy = input.text();
    
    var $temp = $('<input>'); // Create a temporary input element
    $('body').append($temp);
    $temp.val(textToCopy).select(); // Set the input value and select it
    document.execCommand('copy'); // Copy the selected text to the clipboard
    navigator.clipboard.writeText(textToCopy); // for the mac
    $temp.remove(); // Remove the temporary input element
    $.notify(notifyText, { pos: 'top-right' });
  }
}

/* Javascript for facebook signin/signup */

$(document).ready(function () {
  var SignupEmailAvailable = '<p class="hype-text-success">Almost done! Just choose a password to finish creating your Hypeddit account</p>';
  var SignupEmailExist = '<p class="hype-text-danger has-margin-bottom--off">Oops - looks like your Facebook email address is already associated with an existing Hypeddit account.</p><p class="hype-text-danger has-margin-bottom--off">Please simply log in to your existing Hypeddit account with this email address using Login.</p>';
  var SignupEmailNotAvailable = '<p class="hype-text-danger has-margin-bottom--off">Oops - looks like Facebook cannot share your info with us.</p><p class="hype-text-danger">No problem! Please just fill in your name and email address directly on this page to start your free account.</p>';

  // get fb app id
  var fb_app_id = "";
  var fb_app_version = "";
  try {
    fb_app_id = document.getElementById("customjslog").getAttribute("data-fbappid");
  } catch (eAppID) {}

  if (typeof fb_app_id === "undefined") {
    fb_app_id = '{{config("facebook.app_id")}}';
  } else if (fb_app_id == "") {
    fb_app_id = '{{config("facebook.app_id")}}';
  }
  // get fb app version
  try {
    fb_app_version = document.getElementById("customjslog").getAttribute("data-fbappversion");
  } catch (eAppVer) {}

  if (typeof fb_app_version === "undefined") {
    fb_app_version = '{{config("facebook.graph_api_version")}}';
  } else if (fb_app_id == "") {
    fb_app_version = '{{config("facebook.graph_api_version")}}';
  }

  var fb_scope = "public_profile,email";
  var fb_fields = "id,first_name,last_name,email";
  

  facebookSignup = function () {
    
    $(".sc-warning-error").hide();
    $(".sign-container-section").removeClass("on-sc-error");
    $(".error-msg").hide();
    
    var redirection_route = "/blogpromotion/channels";
    signup_isajax = $("#signup_isajax").val();
    
    FB.logout(function(response) {});
    FB.login(
      function (response) {
        if (response.status === 'connected' && response.authResponse) {
          if (response.authResponse.accessToken != "" && response.authResponse.accessToken != undefined) {
            
              var signup_source = "";
              $(".sign-container-section").addClass("on-sc-error");
              if (signup_isajax == 1) {
                $("#main_signup_form #fb-message").html("").removeClass("hidden");
                $("#main_signup_form #fb-message-error").removeClass("hidden");
                signup_source = "partnerprofile";
              } else {
                $("#fb-message").html("").removeClass("hidden");
                $("#fb-message-error").removeClass("hidden");
              }

              $.ajax({
                dataType: "json",
                type: "POST",
                url: "/signupwithfacebook",
                data: {
                  cred: response.authResponse.accessToken,
                },
                async: false,
                success: function (response) {
                  if (response.action == true) {
                    if (signup_isajax == 1) {
                      
                      $("#signin-popup").modal("hide");
                      $("#login-popup").modal("hide");
                      // HYPE-598
                      try {
                        if ($("#fb_calling_page").length) {
                          var fb_calling_page = $("#fb_calling_page").data("page");
                          var fb_callback = $("#fb_calling_page").data("callback");
                          if ( fb_calling_page == "promote" || fb_calling_page == "fanpromotion") {
                            var campaign_selected = $("#budget_select").val(); //dayOrBudgetSelected
                            var destination_url = $("#destination_url").val(); //dayOrBudgetSelected
                            $.ajax({
                              type: "POST",
                              url: "/fanpromotion/setcampaignsettings",
                              dataType: "json",
                              data: {
                                campaign_selected: campaign_selected,
                                destination_url: destination_url,
                              },
                              success: function (res) {
                                location.reload();
                              },
                              error: function () {
                                location.reload();
                              },
                            });
                            return;
                          }
                        } else {
                        }
                      } catch (fberr) {
                        console.log(fberr);
                      }
                      //
                      //*** before returning to channel list
                      // set the session to contain all the selected channels from the page
                      // pass these into this post and then redirect logged in user
                      var selected_channels = [];
                      $(".load-promochannels .email_promotion:checked")
                        .not(":disabled")
                        .each(function () {
                          selected_channels.push($(this).val());
                        });
                      $.ajax({
                        type: "POST",
                        url: "/promotion/setprofileselections",
                        dataType: "json",
                        data: { selected_channels: selected_channels },
                        success: function (res) {
                          //
                          if (redirection_route != "") {
                            window.location.href = redirection_route;
                          }
                        },
                        error: function () {
                          //
                          if (redirection_route != "") {
                            window.location.href = redirection_route;
                          }
                        },
                      });
                      //
                    } else {
                      if (response.nextlink != "") {
                        window.location.href = response.nextlink;
                      } else {
                        window.location.href = "/welcome";
                      }
                    }
                  }else{
                    if (signup_isajax == 1) {
                      $("#main_signup_form #fb-message").html(SignupEmailExist).removeClass("hidden");
                      $("#main_signup_form #fb-message-error").removeClass("hidden");
                    } else {
                      $("#fb-message").html(SignupEmailExist).removeClass("hidden");
                      $("#fb-message-error").removeClass("hidden");
                    }
                    $(".sign-container-section").addClass("on-sc-error");
                    
                    $("#verify_signup_error").hide();
                    $("#"+signup_first_name).val("");
                    $("#"+signup_last_name).val("");
                    $("#"+signup_email).val("");
                    $("#signup_facebook_id").val("");
                    $("#signup_google_id").val("");
                    $("#signup_password").val("");
                  }
                },
              });
             
          } else {
            if (signup_isajax == 1) {
              $("#main_signup_form #fb-message").html(SignupEmailNotAvailable).removeClass("hidden");
              $("#main_signup_form #fb-message-error").removeClass("hidden");
            } else {
              $("#fb-message").html(SignupEmailNotAvailable).removeClass("hidden");
              $("#fb-message-error").removeClass("hidden");
            }
            $(".sign-container-section").addClass("on-sc-error");

            $("#verify_signup_error").hide();
            $("#"+signup_first_name).val("");
            $("#"+signup_last_name).val("");
            $("#"+signup_email).val("");
            $("#signup_facebook_id").val("");
            $("#signup_google_id").val("");
            $("#signup_password").val("");
          }
        }
      },
      { scope: fb_scope, auth_type: "reauthorize" }
    );
  };

  facebookLogin = function () {
    
    $(".sc-warning-error").hide();
    $(".sign-container-section").removeClass("on-sc-error");
    $(".error-msg").hide();
    
    login_isajax = $("#login_isajax").val();
    var redirection_route = "/blogpromotion/channels";
    FB.logout(function(response) {});
    FB.login(
      function (response) {
        if (response.status === 'connected' && response.authResponse) {
          if (response.authResponse.accessToken != "" && response.authResponse.accessToken != undefined) {
              $.ajax({
                dataType: "json",
                type: "POST",
                url: "/loginwithfacebook",
                data: {
                  cred: response.authResponse.accessToken,
                },
                async: false,
                success: function (response) {
                  if (response.url && response.url !== "") {
                    if (login_isajax == 1) {
                      
                      $("#signin-popup").modal("hide");
                      $("#login-popup").modal("hide");
                      // HYPE-598
                      try {
                        if ($("#fb_calling_page").length) {
                          var fb_calling_page = $("#fb_calling_page").data("page");
                          var fb_callback = $("#fb_calling_page").data("callback");
                          if (fb_calling_page == "promote" || fb_calling_page == "fanpromotion") {
                            var campaign_selected = $("#budget_select").val(); //dayOrBudgetSelected
                            var destination_url = $("#destination_url").val(); //dayOrBudgetSelected
                            $.ajax({
                              type: "POST",
                              url: "/fanpromotion/setcampaignsettings",
                              dataType: "json",
                              data: {
                                campaign_selected: campaign_selected,
                                destination_url: destination_url,
                              },
                              success: function (res) {
                                location.reload();
                              },
                              error: function () {
                                location.reload();
                              },
                            });
                            return;
                          }
                        } else {
                        }
                      } catch (fberr) {
                        console.log(fberr);
                      }
                      //
                      //*** before returning to channel list
                      // set the session to contain all the selected channels from the page
                      // pass these into this post and then redirect logged in user
                      var selected_channels = [];
                      $(".load-promochannels .email_promotion:checked")
                        .not(":disabled")
                        .each(function () {
                          selected_channels.push($(this).val());
                        });
                      $.ajax({
                        type: "POST",
                        url: "/promotion/setprofileselections",
                        dataType: "json",
                        data: { selected_channels: selected_channels },
                        success: function (res) {
                          //
                          if (redirection_route != "") {
                            window.location.href = redirection_route;
                          }
                        },
                        error: function () {
                          //
                          if (redirection_route != "") {
                            window.location.href = redirection_route;
                          }
                        },
                      });
                      //
                    } else {
                      window.location.href = response.url;
                    }
                  } else {
                    $("#"+signup_first_name).val("");
                    $("#"+signup_last_name).val("");
                    $("#"+signup_email).val("");
                    $("#signup_facebook_id").val("");
                    $("#signup_google_id").val("");
                    $("#signup_password").val("");

                    $("#fb-message, #fb-message-error").addClass("hidden");
                    $(".sign-container-section").removeClass("on-sc-error");

                    if (login_isajax == 1) {
                      $("#login-popup").removeClass("fade").modal("hide");
                      $("#signin-popup").addClass("fade").modal({ show: "true" });
                    } else {
                      if (response.error_value == 99) {
                        $(".name_error_email")
                          .html(
                            'This account is currently blocked from access to Hypeddit. Please contact <a href="javascript:void(0)" id="contact_us" onclick="zE.activate({hideOnClose: true});">Support</a> for questions.'
                          )
                          .show()
                          .parent()
                          .addClass("has-error-updated");
                      } else {
                        window.location.href = "/signup";
                      }
                    }
                  }
                },
              });
          }
        }
      },
      { scope: fb_scope, auth_type: "reauthorize" }
    );
  };
});

function merge_reguest() {
  $.ajax({
    type: "POST",
    url: "/mergerequest",
    dataType: "json",
    async: false,
    success: function (result) {
      if (result.action == true) {
        $("#merge-request-success").modal({ show: "true" });
      } else {
        $("#merge-request-failure").modal({ show: "true" });
      }
    },
  });
}

function makeid(len) {
  if (len == "" || len <= 0 || len === undefined) {
    len = 5;
  }

  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/* ================================= */
/* :::  Auto Scroll SC to YT ::: */
/* ================================= */
$(document).ready(function () {
  $(".scroll_1").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#section2").offset().top,
      },
      1000
    );
  });
  $(".scroll_2").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#section3").offset().top,
      },
      1000
    );
  });
  $(".scroll_3").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#section4").offset().top,
      },
      1000
    );
  });
  $(".scroll_4").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#section1").offset().top,
      },
      1000
    );
  });
});

$("body").on("click", "#switch", function () {
  $("#DirectCoverArt").addClass("hide");
  $("#IsbannerRequired").removeClass("hide");

  $("#fangate_style").val(0);
});

$("body").on("click", "#switch_back", function () {
  $("#IsbannerRequired").addClass("hide");
  $("#DirectCoverArt").removeClass("hide");
  if ($("#edit").length) {
    $("#manual_coverart_on").removeClass("hide");
  }
  $("#fangate_style").val(1);
});

$("body").on("click", "#switch_for_manual_artwork", function () {
  $("#manual_coverart_on").removeClass("hide");
  $("#auto_coverart_error").addClass("hide");
});

var newWindow = "";
function PopupCenterDual(url, title, w, h) {
  // Fixes dual-screen position Most browsers Firefox
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : screen.top;
  width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  newWindow = window.open(
    url,
    title,
    "scrollbars=yes, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
function isValidSoundCloudUrl(text) {
  var re =
    /^((https:\/\/)|(http:\/\/)|(www.)|(m\.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/i;
  if (re.test(text)) return true;
  return true;
}

function isValidYoutubeUrl(text) {
  if (text == '') {
    return false
  }

  const youtubeUrlPattern = /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com)/g;
  const matches = text.match(youtubeUrlPattern);
  if (matches) {
    const matchCount = matches.length;
    if (matchCount>1) {
      return false;
    }
  }

  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return p.test(text);
}
function validateYouTubeUrl(url) {
  // Regular expression pattern for valid YouTube URLs
  var pattern = /^(https:\/\/)?(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?[A-Za-z0-9_-]+(\?.*)?$/;
  
  // Test the URL against the pattern
  result = pattern.test(url);
  return result;
}
// HYPE-1208
var videoLoaded = false;
var videoRemoved = false;
var wistiavideo = null;

//
if ($("#youtubevideoframe").length) {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var ytPlayerss;
  var intialPlayerTypeGate = $("#player-frame").data("playertype");
  function onYouTubeIframeAPIReady() {
    bindYouTubeShortVideo();
    try {
      if (intialPlayerTypeGate == "youtube") {
        setTimeout(function () {
          bindPlayer("youtube");
        }, 2000);
      }
    } catch (eer) {
      // console.log(eer);
    }
  }
}

function bindYouTubeShortVideo() {
  console.log("bindYouTubeShortVideo");
  var youtubeVideoFrame = document.getElementById("youtubevideoframe");
  ytPlayerss = new YT.Player(youtubeVideoFrame, {
    events: {
      onReady: function (event) {
        try {
          var videoduration = event.target.getDuration();
          if (videoduration == 0) {
            console.log("yt error 1");
            videoLoaded = false;
            videoRemoved = true;
            removevideoframe();
          } else {
            videoLoaded = true;
            showvideoframe();
            console.log(videoduration);
          }
        } catch (ee) {}
        //
      },
      onError: function (event) {
        if (videoLoaded == true) {
          return;
        }
        console.log("yt error");
        videoRemoved = true;
        removevideoframe();
      },
    },
  });
}
//
if ($("#vimeovideoframe").length) {
  console.log("vimeovideoframe");
  var vimeovideoframe = document.querySelector("iframe#vimeovideoframe");
  var player = new Vimeo.Player(vimeovideoframe);
  var vimeoPlayerID = $("iframe#vimeovideoframe").data("id");
  //
  player.getVideoTitle().then(function (title) {
    videoLoaded = true;
    showvideoframe();
  });
}
//
if ($("#wistiavideoframe").length) {
  var wistiaPlayerID = $("iframe#wistiavideoframe").data("id");
  window._wq = window._wq || [];
  _wq.push({
    id: wistiaPlayerID,
    onReady: function (wistiaVideo) {
      videoLoaded = true;
      showvideoframe();
      console.log("wistiaPlayer loaded");
    },
  });
}
//
$(window).load(function () {
  if (
    $("#youtubevideoframe").length ||
    $("#vimeovideoframe").length ||
    $("#wistiavideoframe").length
  ) {
    if (videoRemoved == false) {
      setTimeout(function () {
        if (videoLoaded == false) {
          console.log("video api is not responding");
          videoRemoved = true;
          removevideoframe();
        }
      }, 2000);
    }
  }
});
//
function showvideoframe() {
  $.ajax({
    type: "POST",
    url: "/gatevideoissuereset",
    dataType: "json",
    data: { action: "reset" },
    success: function (result) {},
  });
}
//
function removevideoframe() {
  $.ajax({
    type: "POST",
    url: "/gatevideoissue",
    dataType: "json",
    data: { action: "issue" },
    success: function (result) {},
  });
}

function userTrace(base, code) {
  $.post("/users/trace", {base_code: base, code: code}, function(result) {
  });
}

$('#pay_first_name, #pay_last_name').on('keypress', function (event) {
    var regex = new RegExp("^[<>*;]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(key)) {
       event.preventDefault();
       return false;
    }
});
function signupCaptchaLoad() { 
  // invisible v2
  if (grecaptchainvisiblev2 == 1) {
    try {
      signup_captcha_widget = grecaptcha.render('signup_captcha_element', {
          'sitekey': grecaptchainvisiblev2Key,
          'size': 'invisible',
          'callback': onSignupSubmit
      });
    } catch (err) {
    }
  }
  // v3
  if (grecaptchaV3 == 1) {
    try {
      signup_captcha_widget = grecaptcha.render('signup_captcha_element', {
          'sitekey': grecaptchaV3Key,
          'size': 'invisible',
          'callback': onSignupSubmit
      });
    } catch (err) {
    }
  }
  // visible
  if (grecaptchaV2 == 1) {
    try {
        signup_captcha_widget = grecaptcha.render('signup_captcha_element', {
            'sitekey' : grecaptchaV2Key,
          });
    } catch (error){}
  }
}

function onSignupSubmit(token) {
  if (grecaptchaV3 == 1) {
    $("#xyzabcver3abcxyz").val(token);
  }

  if (grecaptchainvisiblev2 == 1) {
    $("#xyzabcver2abcxyz").val(token);
  }
  var isSignupFormValid = validateSignupForm();
  if (isSignupFormValid) {
    $("#signup_form_button").addClass('hype-loading-btn').prop('disabled', true);
    document.getElementById("signup_form").submit();
  } else {
    if (grecaptchainvisiblev2 == 1) {
      $("#xyzabcver2abcxyz").val('');
      try {
        if (window.grecaptcha) {
          signup_captcha_widget.reset();
        }
      } catch (ecr) {}
    }
  }
}

function validateSignupForm () {

    var sScAuthURL = $("#sScAuthURL").attr("data-auth");
    var signup_first_name = $("#"+signup_first_name).val("");
    var signup_last_name = $("#"+signup_last_name).val(); 
    var email = $("#"+signup_email).val();
    var sEmail = $("#"+signup_email).val().trim();
    var password = $("#signup_password").val();
    var facebook_id = $("#signup_facebook_id").val();
    var use_captcha = $("#use_captcha").val();
    var agree = $("#confirm_checkbox").val();
    var captchaResponse = '';
    $(".term_error,.name_error_signup_email,.name_error_signup_password,#error-captcha").hide().parent().removeClass("is-invalid");
    
    if (use_captcha == 1) {
      if (grecaptchaV2 == 1) {
        try {
          captchaResponse = grecaptcha.getResponse(signup_captcha_widget);
          $("#xyzabcver2abcxyz").val(captchaResponse);
        } catch(ec) {
        }
      }
    }

    if ($("#"+signup_email).val() == "") {

      $(".name_error_signup_email").show();
      $(".name_error_signup_password, .term_error, #error-captcha").hide().parent().removeClass("is-invalid");
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_email").html(warningIcon + "Please enter your email address.").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if ($("#"+signup_email).val() != "" && (! validateEmail(sEmail) || $("#verified").val() == 0)) {
      $(".term_error,.name_error_signup_email,.name_error_signup_password,#error-captcha").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_email").show();
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_email").html(warningIcon + "Oops! That email looks a little off. Try again?").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if ($.trim($("#signup_password").val()) == "") {

      $(".name_error_signup_email, .term_error, #error-captcha").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").show();
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").html(warningIcon + "Please enter your password.").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if ($.trim($("#signup_password").val()).length < 6) {

      $(".name_error_signup_email, .term_error, #error-captcha").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").show();
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").html(warningIcon + "The password must be at least 6 characters.").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if ($.trim($("#signup_password").val()).length > 30) {

      $(".name_error_signup_email, .term_error, #error-captcha").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").show();
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").html(warningIcon + "The password may not be greater than 30 characters.").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if (/\s/.test($("#signup_password").val())) {

      $(".name_error_signup_email, .term_error, #error-captcha").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").show();
      $(".term_error").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").html(warningIcon + "The password cannot contain any spaces.").parent().addClass("is-invalid");
      $("#loader").hide();
      return false;

    } else if (use_captcha == 1 && captchaResponse.length == 0 && grecaptchaV2 == 1) {

      $(".term_error,.name_error_signup_email,.name_error_signup_password").hide();
      
      $(".security-captcha").addClass("form-relative has-error");
      $("#error-captcha").remove();
      $(".security-captcha").append("<div id='error-captcha' class='name_error_email hype-invalid-feedback' style='display: block;'>"+warningIcon+" Please verify that you are not a robot.</div>");

      return false;

    } else if (!$("#confirm_checkbox").is(":checked")) {

      $(".name_error_signup_email").hide().parent().removeClass("is-invalid");
      $(".name_error_signup_password").hide().parent().removeClass("is-invalid");
      $(".term_error").show();
      $(".term_error").html(warningIcon + "Please accept our terms and conditions.").parent().addClass("is-invalid");
      return false;
    }

    return true;
}

// HYPE-2537 - Eye Icon Hide show 
function showHidePasswordText(clickElement, inputElement) {

  let showHideAttr = inputElement.getAttribute('type');

  if (showHideAttr === 'password') {
      showHideAttr = 'text';
  } else {
      showHideAttr = 'password';
  }
  inputElement.setAttribute('type', showHideAttr);
  clickElement.classList.toggle('eyeslashIcon');
}

$(".inputWithFocus").on('click focus', function () {
  $(this).parent().addClass('focus');
}).on('blur', function () {
  $(this).parent().removeClass('focus');
});

$("#showHidePassword").click(function() {
  const clickElement = document.getElementById('showHidePassword');
  const inputElement = document.getElementById('signup_password');

  showHidePasswordText(clickElement, inputElement)
});

$("#showHidePasswordLogin").click(function() {
  const clickElement = document.getElementById('showHidePasswordLogin');
  const inputElement = document.getElementById('login_password');

  showHidePasswordText(clickElement, inputElement)
});

$("#showHideResetPassword").click(function() {
  const clickElement = document.getElementById('showHideResetPassword');
  const inputElement = document.getElementById('new_password1');

  showHidePasswordText(clickElement, inputElement)
});

$("#showHideResetConfirmPassword").click(function() {
  const clickElement = document.getElementById('showHideResetConfirmPassword');
  const inputElement = document.getElementById('new_password2');

  showHidePasswordText(clickElement, inputElement)
});

function onWarningModal(el) {

  try {

    var elementPassed = $(el);
    var modalId = elementPassed.data('warningmodalid');
    var targetUrl = elementPassed.data('url');
    var showAnotherModal = elementPassed.data('showanothermodal');

    if (modalId && modalId !== 'none' && modalId !== 'undefined') {

      var modalElement = $('#' + modalId);

      if (modalElement.length) {

        if (showAnotherModal && showAnotherModal !== '' && showAnotherModal !== 'undefined' && showAnotherModal !== 'none') {
          var linkInModal = modalElement.find('[class*="pass-thru-link"]').first();
          if (linkInModal.length) {
            linkInModal.attr('href', 'javascript:void(0);');
            linkInModal.attr('onclick', 'javascript:onWarningFollowupModal("' + showAnotherModal + '", "' + targetUrl + '")');
            linkInModal.attr('data-dismiss','modal');
          }

        } else {
          var linkInModal = modalElement.find('[class*="pass-thru-link"]').first();
          if (linkInModal.length && targetUrl) {
            linkInModal.attr('href', targetUrl);
          }
        }

        modalElement.modal({show: 'true'});

      }
    }

  } catch(e) {
    console.log('warning modal error: '+e);
  }
}

function onWarningFollowupModal(name, passThruLink) {

  try {

    if (passThruLink == '' || passThruLink == null || passThruLink == 'undefined') {
      passThruLink = '/dashbaord';
    }

    var surveyType = 'general';
    if (name == 'warning-ad-incomplete-followup-modal') {
      surveyType = 'ad-incomplete';
    }

    var modalFollowupElement = $('#' + name);

    if (!modalFollowupElement.length) {
      window.location.href = passThruLink;
      return;
    }

    // Cleanup any previous event handlers to avoid stacking
    modalFollowupElement.off('hidden.bs.modal');
    modalFollowupElement.find('.modal-survey-submit-button').off('click');

    // Redirect on submit button click
    modalFollowupElement.find('.modal-survey-submit-button').on('click', function() {

      var surveyText = modalFollowupElement.find('textarea').val() || '';

      modalFollowupElement.modal('hide');

      $.ajax({
        type: "POST",
        url: "/modalpopupsurvey",
        async: true,
        data: { surveyType: surveyType, surveyText: surveyText },
        success: function (res) {
          window.location.href = passThruLink;
        },
        fail: function (res) {
          window.location.href = passThruLink;
        }
      });
    });

    modalFollowupElement.find('.modal-survey-skip-button').on('click', function() {

      modalFollowupElement.modal('hide');

      $.ajax({
        type: "POST",
        url: "/modalpopupsurvey",
        async: true,
        data: { surveyType: surveyType, surveyText: 'skip' },
        success: function (res) {
          window.location.href = passThruLink;
        },
        fail: function (res) {
          window.location.href = passThruLink;
        }
      });
    });

    // Redirect if the modal is closed any other way
    modalFollowupElement.on('hidden.bs.modal', function () {
      if ($('.modal.show').length) {
        $('body').addClass('modal-open'); // at least one modal still open
      }
      window.location.href = passThruLink;
    });

    modalFollowupElement.on('shown.bs.modal', function () {
      $('body').addClass('modal-open');
    });

    // Show the modal
    modalFollowupElement.modal({show: true});

  } catch(e) {
    console.log('warning followup modal error:'+e);
  }
}


function extractSoundcloudId(id) {
  try {
      // Return null if the input is empty or not a string
      if (!id) {
          return id;
      }

      // Determine the delimiter (colon or slash)
      const delimiter = id.includes(':') ? ':' : '/';

      // Split the string based on the chosen delimiter
      const segments = id.split(delimiter);
      
      // Return the last segment as the ID, or the original ID if no segments found
      return segments.length > 0 ? segments[segments.length - 1] : id;
      
  } catch (error) {
      console.error("Error extracting ID:", error);
      // Return the original ID in case of an exception
      return id;
  }
}