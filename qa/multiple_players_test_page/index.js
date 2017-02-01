//Google Analytics initialization
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44956138-2', 'none');

$.ajaxSetup({
  cache: true
});

$(window).load(function() {
  //Get initial inputs
  var params = getQueryStringParams();
  var embedCode = params.embedCode || params.ec;
  var playerBrandingId = params.playerBrandingId || params.pbid;
  var pcode = params.pcode;
  var corePlayerPath = params.core_player;
  var html5SkinPath = params.html5_skin;
  var skinAssetPath = params.skin_asset;
  var skinConfigPath = params.skin_config;
  var inlineSkinConfigCode = params.inline_skin;
  var adPlugins = params.ad_plugin;
  var additionalPlugins = params.additional_plugins;
  var inlinePlayerParams = params.options;

  var embedCode2 = params.embedCode2 || params.ec2;
  var playerBrandingId2 = params.playerBrandingId2 || params.pbid2;
  var pcode2 = params.pcode2;
  var inlinePlayerParams2 = params.options2;

  //Set initial inputs
  if (embedCode && embedCode != "") {
    $('#embed_code_input').val(embedCode);
  }
  if (playerBrandingId && playerBrandingId != "") {
    $('#pbid_input').val(playerBrandingId);
  }
  if (pcode && pcode != "") {
    $("#pcode_input").val(pcode);
  }
  if (corePlayerPath && corePlayerPath != "") {
    $("#core_player_input").val(decodeURIComponent(corePlayerPath));
  }
  if (html5SkinPath && html5SkinPath != "") {
    $("#html5_skin_input").val(decodeURIComponent(html5SkinPath));
  }
  if (skinAssetPath && skinAssetPath != "") {
    $("#asset_input").val(decodeURIComponent(skinAssetPath));
  }
  if (skinConfigPath && skinConfigPath != "") {
    $("#skin_config_input").val(decodeURIComponent(skinConfigPath));
  }
  if (inlineSkinConfigCode && inlineSkinConfigCode != "") {
    $('#skin_inline_input').val(decodeURIComponent(inlineSkinConfigCode));
  }
  if (adPlugins && adPlugins != "") {
    $('#ad_plugins_input').val(decodeURIComponent(adPlugins));
  }
  if (additionalPlugins && additionalPlugins != "") {
    $('#additional_plugins_input').val(decodeURIComponent(additionalPlugins));
  }
  if (inlinePlayerParams && inlinePlayerParams != "") {
    $('#player_params_input').val(decodeURIComponent(inlinePlayerParams));
  }

  //2nd player
  if (embedCode2 && embedCode2 != "") {
    $('#embed_code_input2').val(embedCode2);
  }
  if (playerBrandingId2 && playerBrandingId2 != "") {
    $('#pbid_input2').val(playerBrandingId2);
  }
  if (pcode2 && pcode2 != "") {
    $("#pcode_input2").val(pcode2);
  }
  if (inlinePlayerParams2 && inlinePlayerParams2 != "") {
    $('#player_params_input2').val(decodeURIComponent(inlinePlayerParams2));
  }

  $("#skin_inline_input").hide();

  if(embedCode && playerBrandingId && pcode && corePlayerPath) {
    testMovie();
  }

});

function generateURL(embedCode, playerBrandingId, pcode, corePlayerPath, html5SkinPath, skinAssetPath, skinConfigPath, inlineSkinConfigCode, adPlugins, additionalPlugins, inlinePlayerParams, embedCode2, playerBrandingId2, pcode2, inlinePlayerParams2) {
  var queryStringParams = "?";

  if (embedCode && embedCode != "") {
    queryStringParams += "ec=" + embedCode;
  }
  if (playerBrandingId && playerBrandingId != "") {
    queryStringParams += "&pbid=" + playerBrandingId;
  }
  if (pcode && pcode != "") {
    queryStringParams += "&pcode=" + pcode;
  }
  if (corePlayerPath && corePlayerPath != "") {
    queryStringParams += "&core_player=" + encodeURIComponent(corePlayerPath);
  }
  if (html5SkinPath && html5SkinPath != "") {
    queryStringParams += "&html5_skin=" + encodeURIComponent(html5SkinPath);
  }
  if (skinAssetPath && skinAssetPath != "") {
    queryStringParams += "&skin_asset=" + encodeURIComponent(skinAssetPath);
  }
  if (skinConfigPath && skinConfigPath != "") {
    queryStringParams += "&skin_config=" + encodeURIComponent(skinConfigPath);
  }
  if (inlineSkinConfigCode && inlineSkinConfigCode != "") {
    if (typeof(inlineSkinConfigCode) === "string") {
      queryStringParams += "&inline_skin=" + encodeURIComponent(inlineSkinConfigCode);
    } else {
      queryStringParams += "&inline_skin=" + encodeURIComponent(JSON.stringify(inlineSkinConfigCode));
    }
  }
  if (adPlugins && adPlugins != "") {
    queryStringParams += "&ad_plugin=" + encodeURIComponent(adPlugins);
  }
  if (additionalPlugins && additionalPlugins != "") {
    queryStringParams += "&additional_plugins=" + encodeURIComponent(additionalPlugins);
  }
  if (inlinePlayerParams && inlinePlayerParams != "") {
    if (typeof(inlinePlayerParams) === "string") {
      queryStringParams += "&options=" + encodeURIComponent(inlinePlayerParams);
    } else {
      queryStringParams += "&options=" + encodeURIComponent(JSON.stringify(inlinePlayerParams));
    }
  }

  //2nd player
  if (embedCode2 && embedCode2 != "") {
    queryStringParams += "&ec2=" + embedCode2;
  }
  if (playerBrandingId2 && playerBrandingId2 != "") {
    queryStringParams += "&pbid2=" + playerBrandingId2;
  }
  if (pcode2 && pcode2 != "") {
    queryStringParams += "&pcode2=" + pcode2;
  }
  if (inlinePlayerParams2 && inlinePlayerParams2 != "") {
    if (typeof(inlinePlayerParams2) === "string") {
      queryStringParams += "&options2=" + encodeURIComponent(inlinePlayerParams2);
    } else {
      queryStringParams += "&options2=" + encodeURIComponent(JSON.stringify(inlinePlayerParams2));
    }
  }

  // update URL without refreshing page
  if(window.history && window.history.pushState) {
    window.history.pushState(window.history.state, "", queryStringParams);
  }
}

function copyPage() {
  var embedCode = $("#embed_code_input").val();
  var playerBrandingId = $("#pbid_input").val();
  var pcode = $("#pcode_input").val();
  var corePlayerPath = $("#core_player_input").val();
  var html5SkinPath = $("#html5_skin_input").val();
  var skinAssetPath = $("#asset_input").val();
  var skinConfigPath = $("#skin_config_input").val();
  var inlineSkinConfigCode = $('#skin_inline_input').val();
  var adPlugins = $("#ad_plugins_input").val();
  var additionalPlugins = $('#additional_plugins_input').val();
  var inlinePlayerParams = $('#player_params_input').val();

  //2nd player
  var embedCode2 = $("#embed_code_input2").val();
  var playerBrandingId2 = $("#pbid_input2").val();
  var pcode2 = $("#pcode_input2").val();
  var inlinePlayerParams2 = $('#player_params_input2').val();

  generateURL(embedCode, playerBrandingId, pcode, corePlayerPath, html5SkinPath, skinAssetPath, skinConfigPath, inlineSkinConfigCode, adPlugins, additionalPlugins, inlinePlayerParams, embedCode2, playerBrandingId2, pcode2, inlinePlayerParams2);

  return document.URL;
}

function testMovie() {
  var embedCode = $("#embed_code_input").val();
  if (!embedCode) {
    alert("Embed Code required.");
    return;
  }
  var playerBrandingId = $("#pbid_input").val();
  if (!playerBrandingId) {
    alert("Player Branding ID required.");
    return;
  }
  var pcode = $("#pcode_input").val();
  if (!pcode) {
    alert("pcode required.");
    return;
  }
  var corePlayerPath = $("#core_player_input").val();
  if (!corePlayerPath) {
    alert("Core Player required.");
    return;
  }
  var html5SkinPath = $("#html5_skin_input").val();
  var skinAssetPath = $("#asset_input").val();
  var skinConfigPath = $("#skin_config_input").val();
  var inlineSkinConfigCode = $('#skin_inline_input').val();
  if (inlineSkinConfigCode && inlineSkinConfigCode != "") {
    inlineSkinConfigCode = $.parseJSON(inlineSkinConfigCode);
  }
  var adPlugins = $("#ad_plugins_input").val();
  var additionalPlugins = $("#additional_plugins_input").val();
  var inlinePlayerParams = $('#player_params_input').val();
  if (inlinePlayerParams && inlinePlayerParams != "") {
    inlinePlayerParams = $.parseJSON(inlinePlayerParams);
  }

  //Add asset stylesheet to page
  $("#asset_css").remove();
  if (skinAssetPath) {
    $('<link/>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: skinAssetPath,
      id: "asset_css"
    }).appendTo('head');
  }

  var playerOptions = generatePlayerOptions(playerBrandingId, pcode, skinConfigPath, inlineSkinConfigCode);

  //Merge data in skin config with possible inline data input by the user
  $.extend(true, playerOptions, inlinePlayerParams);

  // delete old player in order to reuse namespace
  if (window.pp) {
    window.pp.destroy();
  }
  if (window["OO"] && window["OO"].Player) {
    $("#ooplayer").empty();
    $("#ooplayer2").empty();
    delete window["OO"];
  }

  //Create a queue of scripts that we need to load
  var scriptsToLoad = [];

  //We always have to load "core"
  scriptsToLoad.push(corePlayerPath);

  //Check if we need to load these optional plugins
  if (html5SkinPath && html5SkinPath != "") {
    scriptsToLoad.push(html5SkinPath);
  }
  var additionalPluginsList = additionalPlugins.split("\n");
  var adPluginsList = adPlugins.split("\n");
  var allPluginsList = adPluginsList.concat(additionalPluginsList);
  for (var i = 0; i < allPluginsList.length; i++) {
    var plugin = allPluginsList[i];
    if (plugin && plugin != "") {
      scriptsToLoad.push(plugin);
    }
  }

  var embedCodes = [embedCode];
  var options = [playerOptions];
  var playerIds = ["ooplayer"];

  //get parameters for the second player
  var embedCode2 = $("#embed_code_input2").val();
  var playerBrandingId2 = $("#pbid_input2").val();
  var pcode2 = $("#pcode_input2").val();
  var inlinePlayerParams2 = $('#player_params_input2').val();
  if (inlinePlayerParams2 && inlinePlayerParams2 != "") {
    inlinePlayerParams2 = $.parseJSON(inlinePlayerParams2);
  }

  if(embedCode2 && playerBrandingId2 && pcode2) {
    var playerOptions2 = generatePlayerOptions(playerBrandingId2, pcode2, skinConfigPath, inlineSkinConfigCode);

    //Merge data in skin config with possible inline data input by the user
    $.extend(true, playerOptions2, inlinePlayerParams2);
    embedCodes = embedCodes.concat(embedCode2);
    options = options.concat(playerOptions2);
    playerIds = playerIds.concat("ooplayer2");
  }

  // keep url up to date
  generateURL(embedCode, playerBrandingId, pcode, corePlayerPath, html5SkinPath, skinAssetPath, skinConfigPath, inlineSkinConfigCode, adPlugins, additionalPlugins, inlinePlayerParams, embedCode2, playerBrandingId2, pcode2, inlinePlayerParams2);

  //Load all of the scripts in order, then create the player
  loadPlugins(scriptsToLoad, playerIds, embedCodes, options);
}

function generatePlayerOptions(playerBrandingId, pcode, skinConfigPath, inlineSkinConfigCode) {
  return {
    onCreate: function(player) {
      player.mb.subscribe('*', 'test', function(event) {
        if (!event.match(/playheadTime/)) {
          console.log("Message Bus Event: " + event + " " + JSON.stringify(arguments));
        }
      });
    },
    "pcode": pcode,
    "playerBrandingId": playerBrandingId,
    "debug": true,
    skin: {
      config: skinConfigPath,
      inline: inlineSkinConfigCode
    }
  };
}

function loadPlugins(scriptsToLoad, playerIds, embedCodes, playerOptions) {
  if (scriptsToLoad.length > 0) {
    var script = scriptsToLoad[0];
    scriptsToLoad.shift();
    $.getScript(script, function() {
      loadPlugins(scriptsToLoad, playerIds, embedCodes, playerOptions);
    });
  } else {
     window.pp = [];
    OO.ready(function() {
      for (var i in playerIds){
        window.pp.push(OO.Player.create(playerIds[i], embedCodes[i], playerOptions[i]));
      }
    });
  }
}

function goToSupport() {
  ga('send', 'event', 'button', 'support');
  window.open('http://support.ooyala.com/users/contact');
}

function showCopyPrompt() {
  prompt("Here is the URL to copy:", copyPage());
}

function resizeTextArea() {
  var animationDuration = 500;
  if ($("#skin_inline_input").attr("rows") == "1") {
    $("#skin_inline_input").show();
    $("#caret-icon").html("<span class='dropup'><span class='caret'></span></span>");
    $("#skin_inline_input").animate({
      "rows": 10
    }, animationDuration);
  } else {
    $("#caret-icon").html("<span class='caret'></span>");
    $("#skin_inline_input").animate({
      "rows": 1
    }, animationDuration, function() {
      $("#skin_inline_input").hide();
    });
  }
}
