$(document).ready(function () {
			$("#LightSwitchSettingsBox").hide();

    _.mixin({
        clean: function (text) {
            return text.replace(/^\s*$[\n\r]{1,}/gm, '').replace(/”/g, "\"").replace(/“/g, "\"").replace(/”/g, "\"").replace(/’/g, "\'").replace(/‘/g, "\'").replace(/–/g, "\-").replace(/—/g, "\-").replace(/–/g, "\-").replace(/…/g, "\...");
        },
        checkEmpty: function (obj) {
            return obj.b == null && obj.i == null && obj.u == null && obj.sup == null && obj.sub == null;
        }
    });
    var timer;
	var AutoSubmitTimer;
	$('body').attr('id','LightSwitchDropZone');
    $('body').append('<button class="button11"><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" role="img" aria-labelledby="toolIconTitle" stroke="#606162" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/> <g id="SVGRepo_iconCarrier"> <title id="toolIconTitle">Tool</title> <path d="M9.74292939,13.7429294 C9.19135019,13.9101088 8.60617271,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,7.07370693 2.20990431,6.19643964 2.58474197,5.4131691 L6.94974747,9.77817459 L9.77817459,6.94974747 L5.4131691,2.58474197 C6.19643964,2.20990431 7.07370693,2 8,2 C11.3137085,2 14,4.6862915 14,8 C14,8.88040772 13.8103765,9.71652648 13.4697429,10.4697429 L20.5858636,17.5858636 C21.3669122,18.3669122 21.3669122,19.6332422 20.5858636,20.4142907 L19.9142907,21.0858636 C19.1332422,21.8669122 17.8669122,21.8669122 17.0858636,21.0858636 L9.74292939,13.7429294 Z"/> </g></svg></button>');

    $('body').append('<div id="LightSwitchMenuIt" style="background-color:#2f4f4f; position:fixed; bottom:0; left:0; width:100%; height:0px; overflow:hidden; transition: height 0.5s ease-in-out;"></div>');
    
    $('#LightSwitchMenuIt').html(`
        <center>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <input type="button" id="LightSwitchInvites" value="ReInvites" class="LightSwitchNavigators"/> 
            <input type="button" id="LightSwitchMatch" value="Match" class="LightSwitchNavigators"/> 
            <input type="button" id="LightSwitchReset" value="Reset" class="LightSwitchNavigators"/> 
            <input type="button" id="LightSwitchClear" value="Clear" class="LightSwitchNavigators"/> 
            <input type="button" id="LightSwitchSubmit" value="Auto Submit" class="LightSwitchNavigators"/>
            <input type="button" id="ImageMapping" value="Image Mapping" class="LightSwitchNavigators"/> 
            <input type="button" id="RESPNUM" value="Resp Number" class="LightSwitchNavigators"/> 
            <input type="button" id="Captcha" value="Submit Captcha" class="LightSwitchNavigators"/> 
            <input type="button" id="Admin" value="Admin Link" class="LightSwitchNavigators"/> 
            <input type="button" id="Login" value="Login" class="LightSwitchNavigators"/> 
            <select name="credentials" id="credentials"> 
                <option value="test">test</option> 
                <option value="test1">test1</option> 
                <option value="test2">test2</option> 
                <option value="test3">test3</option> 
                <option value="test4">test4</option> 
                <option value="test5">test5</option> 
                <option value="test6">test6</option> 
                <option value="test7">test7</option> 
                <option value="test8">test8</option> 
                <option value="test9">test9</option>  
                <option value="test10">test10</option>
            </select>
        </center> 
        <center>
            <span id="AllQs" class="LightSwitchMultiColor" style="text-align: center;background-color: rgb(210, 121, 121)">**All Matchings**</span>
            <span id="DupW" class="LightSwitchMultiColor" style="text-align: center;background-color: rgb(172, 180, 181)">**Duplicate words**</span>
            <span id="FormatS111" class="LightSwitchMultiColor" style="text-align: center;background-color:#7fc0de">**Formattings**</span>
        </center>
    `);
    
    // Toggle animation
    let menu = $('#LightSwitchMenuIt');
    let button = $('.button11');
    let svg = button.find('svg');

    // Check localStorage for menu state
    if (localStorage.getItem('menuVisible') === 'true') {
        menu.css({'height': '50px', 'transition': 'none'});
        //svg.removeClass('spin-ccw');
    } else {
        menu.css('height', '0px');
       // svg.removeClass('spin-ccw');
    }

    // Toggle animation and store state
    button.on('click', function () {
        if (menu.height() === 0) {
            menu.css('height', '50px');
            menu.animate({ height: '50px' }, 2);
            svg.removeClass('spin-ccw');
            svg.addClass('spin-cw');
           
            localStorage.setItem('menuVisible', 'true');
        } else {
            menu.animate({ height: '0px' }, 2);
            svg.removeClass('spin-cw');
            svg.addClass('spin-ccw');
           
            localStorage.setItem('menuVisible', 'false');
        }
    });

/*$('#LightSwitchVerifyLogics').on('click', function () {
    console.log("Starting validation and verification of questions...");

    $('div.question').each(function () {
        let $q = $(this);
        let questionType = "Unknown";
        let validationPassed = false;

        // 1. Single-Select (Radio Buttons)
        if ($q.find('input[type="radio"]').length > 0) {
            questionType = "Single Select";
            if ($q.find('input[type="radio"]:checked').length === 0) {
                $q.find('input[type="radio"]').first().prop('checked', true);
            }
            validationPassed = $q.find('input[type="radio"]:checked').length > 0;
        }
        // 2. Multi-Select (Checkboxes)
        else if ($q.find('input[type="checkbox"]').length > 0) {
            questionType = "Multi Select";
            if ($q.find('input[type="checkbox"]:checked').length === 0) {
                $q.find('input[type="checkbox"]').prop('checked', true);
            }
            validationPassed = $q.find('input[type="checkbox"]:checked').length > 0;
        }
        // 3. Dropdown (Combo Box)
        else if ($q.find('select').length > 0) {
            questionType = "Dropdown";
            let $select = $q.find('select');
            if (!$select.val() || $select.val() === "") {
                let $firstValid = $select.find('option').filter(function() {
                    return $(this).val() !== "";
                }).first();
                if ($firstValid.length > 0) {
                    $select.val($firstValid.val());
                }
            }
            validationPassed = $select.val() && $select.val() !== "";
        }
        // 4. Open-End (Text Input / Textarea)
        else if ($q.find('input[type="text"], textarea').length > 0) {
            questionType = "Open End";
            let $input = $q.find('input[type="text"], textarea');
            if (!$input.val() || $input.val().trim() === "") {
                $input.val("Test Answer");
            }
            validationPassed = $input.val().trim() !== "";
        }
        // 5. Ranking Questions
        else if ($q.hasClass('ranking')) {
            questionType = "Ranking";
            let allRanked = true;
            $q.find('input.ranking-input').each(function () {
                if (!$(this).val() || $(this).val().trim() === "") {
                    allRanked = false;
                }
            });
            validationPassed = allRanked;
        }
        // 6. Constant Sum Questions
        else if ($q.hasClass('constant-sum')) {
            questionType = "Constant Sum";
            let requiredSum = parseFloat($q.data('required-sum')) || 100;
            let total = 0;
            $q.find('input.constant-sum-input').each(function () {
                let val = parseFloat($(this).val());
                if (!isNaN(val)) {
                    total += val;
                }
            });
            validationPassed = (total === requiredSum);
        }

        if (validationPassed) {
            console.log(`${questionType} validation PASSED ✅`);
        } else {
            console.error(`${questionType} validation FAILED ❌`);
        }
    });

    // Inject script to execute SSI_Verify() within the page context
    let script = document.createElement('script');
    script.textContent = `
        (function() {
            if (typeof SSI_Verify === "function") {
                let verifyResult = SSI_Verify();
                console.log("SSI_Verify() executed. Result:", verifyResult);
            } else {
                console.error("SSI_Verify() function is not found on the page.");
            }
        })();
    `;
    document.documentElement.appendChild(script);
    script.remove();

    console.log("All question validations processed.");
}); */






    
	
	var LightSwitchDropZone = document.getElementById('LightSwitchDropZone');
  	LightSwitchDropZone.addEventListener('dragover', handleDragOver, false);
  	LightSwitchDropZone.addEventListener('drop', handleFileSelect, false);
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'paste';
    }
    var PID = QuestionProperties().PID;
    $('body').append('<div id="LightSwitchNoteBox" class="LightSwitchTogglingElement LightSwitchNavigators"></div>');
    $('#LightSwitchNoteBox').html('<center><input type="radio" name="LightSwitchNoteSelector" id="LightSwitchNote" class="LightSwitchNote"/><label for="LightSwitchNote"   style="margin-right: 3px">Note</label><input type="radio" name="LightSwitchNoteSelector" class="LightSwitchNote" id="LightSwitchReminder" /><label for="LightSwitchReminder" style="padding-right:3px">Reminder</label><input type="text" placeholder="QID" id="LightSwitchQuestion" class="LightSwitchNavigators" style="width: 20px"/><input type="text" placeholder="PID" id="LightSwitchProject" class="LightSwitchNavigators" style="width: 80px"/><br><textarea id="LightSwitchNotepadArea" class="LightSwitchNavigators" style="height: 150px;width: 90%;resize: none" placeholder="Please write here"></textarea><input type="button" id="LightSwitchAddNoteButton" value="Add Note" class="LightSwitchNavigators"/><br><div id="LightSwitchNotepadExportArea" style="height: 350px;width: 320px"></div><br><a href="" id="LightSwitchNoteExportButton" class="LightSwitchNavigators">Export</a><input type="button" id="LightSwitchNoteDeleteButton" value="Delete" class="LightSwitchNavigators"/><input type="button" id="LightSwitchNoteSaveButton" value="Save" class="LightSwitchNavigators"/> <input type="button" id="ImageMapping" value="Image Mapping" class="LightSwitchNavigators"/><input type="button" id="RESPNUM" value="Resp Number" class="LightSwitchNavigators"/><input type="button" id="Captcha" value="Submit Captcha" class="LightSwitchNavigators"/></center>');
    $('#LightSwitchAddNoteInvoker').on('click', function () {
        $('#LightSwitchNoteBox').slideToggle('slow');
        $('#LightSwitchCodePadBox').hide();
        $('#LightSwitchPropertiesBox').hide();
    });
    $('body').append('<div id="LightSwitchCodePadBox" class="LightSwitchTogglingElement LightSwitchNavigators"></div>');
    $('#LightSwitchCodePadBox').html('<center><input type="radio" name="LightSwitchCodeSelector" id="LightSwitchScriptSelector"/><label for="LightSwitchScriptSelector" style="margin-right: 3px">Script</label><input type="radio" name="LightSwitchCodeSelector" id="LightSwitchStyleSelector"/><label for="LightSwitchStyleSelector">Style</label><br><textarea id="LightSwitchCodepadArea" style="width: 90%;height: 200px;resize: none" class="LightSwitchNavigators"></textarea><br><input type="radio" name="LightSwitchInjectTypeSelector" id="LightSwitchAppendSelector"/><label for="LightSwitchAppendSelector" style="margin-right: 3px">Append</label><input type="radio" name="LightSwitchInjectTypeSelector" id="LightSwitchNewInjSelector"/><label for="LightSwitchNewInjSelector">Overwrite</label><input type="button" id="LightSwitchCodeInjectButton" value="Inject Code" class="LightSwitchNavigators"/><input type="button" id="ImageMapping" value="Image Mapping" class="LightSwitchNavigators"/><input type="button" id="RESPNUM" value="Resp Number" class="LightSwitchNavigators"/><input type="button" id="Captcha" value="Submit Captcha" class="LightSwitchNavigators"/></center>');
    $('#LightSwitchAddCodeInvoker').on('click', function () {
        $('#LightSwitchCodePadBox').slideToggle('slow');
        $('#LightSwitchNoteBox').hide();
        $('#LightSwitchPropertiesBox').hide();
    });
    $('body').append('<div id="LightSwitchPropertiesBox" class="LightSwitchTogglingElement LightSwitchNavigators"></div>');
    $('#LightSwitchPropertiesBox').html('');
    $('#LightSwitchPropertiesInvoker').on('click', function () {
        $('#LightSwitchPropertiesBox').slideToggle('slow');
        $('#LightSwitchNoteBox').hide();
        $('#LightSwitchCodePadBox').hide();
    });

    $('body').append('<div id="LightSwitchAboutBox" class="LightSwitchTogglingElement LightSwitchNavigators"></div>');
    $('#LightSwitchLOGO').on('click', function () {
        chrome.extension.sendRequest({ method: "notification", image: "logo.png", message: "This tool is developed and actively maintained by SRIHYD.", header: "Contact" }, function (response) { });
    });

	 $('body').append('<div id="LightSwitchAboutBox" class="LightSwitchTogglingElement LightSwitchNavigators"></div>');
	
	$('#UseFulLinks').on('click', function () {			
			window.open('http://cdn.tns-global.com/multimedia/UK/usefulllinks/LINKS.html');
	 });

	$('#ImageMapping').on('click', function () {			
			window.open('https://www.image-map.net/');
	 });	 

	$('#RESPNUM').on('click', function () {			
			var txt = $("input[name='hid_respnum']").val();
			var respnum = txt.split(",");
			alert(respnum[0]);
	 });		 
	$('#Captcha').on('click', function () {			
			var capt = $("div[id='CaptchaDiv']").html();
			$("input[id='Captcha_r2_c1']").val(capt);
			$('#next_button').length  > 0 ? $('#next_button').click() : 0;
			$('#next_button').click();
	 });
	$('#Admin').on('click', function () {			
			var original_url = document.URL;
			var admin_url;
			var x=original_url.split("/cgi-bin/")[0];
			admin_url=x+"/cgi-bin/admin.pl";
			window.open(admin_url);
	 });
	$('#Login').on('click', function () {
			var original_url = document.URL;
			var x=original_url.split("/cgi-bin/")[1].split(".pl")[0];
			if(x=="admin")
			{
				$("#sign_in_username").val("user");
				$("#sign_in_password").val("TestingPurpose123@");
				$("form[name='mainform']").submit();
			}
			else
			{
				var cred=$("#credentials").val();
				$("#Username,#Password").val(cred);
				$('#next_button').length  > 0 ? $('#next_button').click() : 0;
				$('#next_button').click();
			}
	});		 
	

    $('#LightSwitchProject').val(QuestionProperties().PID);
    $('#LightSwitchQuestion').val(QuestionProperties().QID);
    $('#LightSwitchAddNoteButton').on('click', function () {
        var PID = $('#LightSwitchProject').val();
        var QID = $('#LightSwitchQuestion').val();
        var NoteType;
        if ($('#LightSwitchNote').prop('checked') == true) {
            NoteType = PID + "_Note";
        }
        else if ($('#LightSwitchReminder').is(':checked')) {
            NoteType = PID + "_Reminder";
        }
        var Note = $('#LightSwitchNotepadArea').val();
        if (PID !== null && QID !== null && NoteType !== null && Note !== null) {
            var Data = "#" + QID + "*" + Note;
            if (localStorage.getItem(NoteType) === null) {
                localStorage.setItem(NoteType, Data);
            }
            else {
                var PreVData = localStorage.getItem(NoteType) + Data;
                localStorage.setItem(NoteType, PreVData);
            }
        }
        LightSwitchNotesUpdater();
        $('#LightSwitchNotepadArea').val('');
    });
    function LightSwitchNotesUpdater() {
        var Dat = QuestionProperties();
        var PID = Dat.PID;
        var NoteType;
        if ($('#LightSwitchNote').prop('checked') == true) {
            NoteType = PID + "_Note";
        }
        else if ($('#LightSwitchReminder').is(':checked')) {
            NoteType = PID + "_Reminder";
        }
        var data = localStorage.getItem(NoteType);
        if (data !== null) {
            var AllNotes = data.split('#');
            var str = "<center><table width='90%' id='LightSwitchDynNote'>";
            for (var i = 0; i < AllNotes.length; i++) {
                if (AllNotes[i]) {
                    var x = AllNotes[i].split('*');
                    str = str + "<tr class='LightSwitchDynNoteTR'><td><input type='checkbox' class='LightSwitchNoteFinalizer'></td><td style='width:40px' contenteditable='true' class='LightSwitchDynNoteQ'>" + x[0] + "</td><td style='width:20px'>:</td><td style='width:230px;max-width:230px;word-wrap:break-word;' contenteditable='true'  class='LightSwitchDynNoteM'>" + x[1] + "</td></tr>";
                }
            }
            str += "</table></center>";
            $('#LightSwitchNotepadExportArea').html(str);
        }
        else {
            $('#LightSwitchNotepadExportArea').html("No Data Found!");
        }
    }
    $('.LightSwitchNote').on('change', function () {
        var Dat = QuestionProperties();
        var PID = Dat.PID;
        var NoteType;
        if ($('#LightSwitchNote').prop('checked') == true) {
            NoteType = PID + "_Note";
        }
        else if ($('#LightSwitchReminder').is(':checked')) {
            NoteType = PID + "_Reminder";
        }
        var data = localStorage.getItem(NoteType);
        if (data !== null) {
            var AllNotes = data.split('#');
            var str = "";
            var counter = 1;
            for (var i = 0; i < AllNotes.length; i++) {
                if (AllNotes[i]) {
                    var x = AllNotes[i].split('*');
                    str = str + counter + ". " + x[0] + " : " + x[1] + "\r\n\r\n";
                    counter++;
                }
            }
        }
        var FileName = NoteType + "s.txt";
        $('#LightSwitchNoteExportButton').attr('download', FileName);
        var ExportText = "data:text/plain;base64," + btoa(str);
        $('#LightSwitchNoteExportButton').attr('href', ExportText);
        LightSwitchNotesUpdater();
    });
    $('#LightSwitchCodeInjectButton').on('click', function () {
        var CodeType = "";
        if ($('#LightSwitchScriptSelector').prop('checked') == true) {
            CodeType = "script";
        }
        else if ($('#LightSwitchStyleSelector').is(':checked')) {
            CodeType = "style";
        }
        var code = $('#LightSwitchCodepadArea').val();
        code = "<" + CodeType + ">" + code + "</" + CodeType + ">";
        if ($('#LightSwitchAppendSelector').prop('checked') == true) {
            $('body').append('<span class="LightSwitchCoder">' + code + '</span>');
        }
        else if ($('#LightSwitchNewInjSelector').is(':checked')) {
            $('body').find('.LightSwitchCoder').each(function () {
                $(this).remove();
                $('body').append('<span class="LightSwitchCoder">' + code + '</span>');
            });
        }
    });
    $('#LightSwitchNoteDeleteButton').on('click', function () {
        $('input.LightSwitchNoteFinalizer').filter(':checked').each(function () {
            $(this).closest('tr').detach();
        });
        LightSwitchSaveNow();
        LightSwitchNotesUpdater();
    });
    function LightSwitchSaveNow() {
        var str = "";
        $('#LightSwitchDynNote').find('tr.LightSwitchDynNoteTR').each(function () {
            var Q = $(this).find('.LightSwitchDynNoteQ').text();
            var M = $(this).find('.LightSwitchDynNoteM').text();
            str = str + "#" + Q + "*" + M;
            var Dat = QuestionProperties();
            var PID = Dat.PID;
            var NoteType;
            if ($('#LightSwitchNote').prop('checked') == true) {
                NoteType = PID + "_Note";
            }
            else if ($('#LightSwitchReminder').is(':checked')) {
                NoteType = PID + "_Reminder";
            }
            localStorage.setItem(NoteType, str);
        });
    }
    $('#LightSwitchNoteSaveButton').on('click', function () {
        LightSwitchSaveNow();
        LightSwitchNotesUpdater();
    });
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.dataTransfer.files[0];
        var name = file.name;
        if (file) {
            var reader;
            reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                var fileString = evt.target.result;
                var str = fileString;
                if (str.length > 0) {
                    chrome.extension.sendRequest({ method: "passThisXML", key: str, MDDName: name }, function (response) {
                        var Dat = response.data;
                    });
                }
            };
        }
    }
    if (localStorage.getItem("LightSwitchSettings") === null) {
        var infiniteScrollEnabled = {
            "Precode": "false",
            "Developer": "false",
            "Robot": "false",
            "Reminders": "false",
            "Formats": "true",
            "AutoSubmit": "false",
			"GOTOScript": "false"
        };
        localStorage.setItem('LightSwitchSettings', JSON.stringify(infiniteScrollEnabled));
    }
    LightSwitchUpdateSettings();
    $('#LightSwitchSettingsBox').on('change', function () {
        var PreCodeSetting = $('#LightSwitchPrecode').prop('checked') == true ? "true" : "false";
        var DeveloperMode = $('#LightSwitchDeveloper').prop('checked') == true ? "true" : "false";
        var FormattingsMode = $('#LightSwitchFormats').prop('checked') == true ? "true" : "false";
        var RemindersMode = $('#LightSwitchReminders').prop('checked') == true ? "true" : "false";
        var RobotMode = $('#LightSwitchRobot').prop('checked') == true ? "true" : "false";
        var AutoSubmitMode = $('#LightSwitchAutoSubmit').prop('checked') == true ? "true" : "false";
        var LightSwitchGOTOMode = $('#LightSwitchGOTO').prop('checked') == true ? "true" : "false";
        var LightSwitchSettings = {
            "Precode": PreCodeSetting,
            "Developer": DeveloperMode,
            "Robot": RobotMode,
            "Reminders": RemindersMode,
            "Formats": FormattingsMode,
            "AutoSubmit": AutoSubmitMode,
            "GOTOScript": LightSwitchGOTOMode
        };
        localStorage.setItem('LightSwitchSettings', JSON.stringify(LightSwitchSettings));
        LightSwitchUpdateSettings();
    });
    function LightSwitchUpdateSettings() {
        var Data = JSON.parse(localStorage.getItem('LightSwitchSettings'));
        var PrecodeSetting = Data.Precode,
			Developer = Data.Developer,
			Formats = Data.Formats,
			Robot = Data.Robot,
			Reminders = Data.Reminders,
			AutoSubmit = Data.AutoSubmit,
			GOTOScript = Data.GOTOScript;
        if (GOTOScript == "true") {
            //$('#LightSwitchGOTO').prop('checked', true);
            // if ($('.LSPRECODE').length  < 1) {
                // DisplayPrecode();
            // }
			//alert("Feature is coming soon.");
			$("#LightSwitchGOTO").prop("checked", false);
        }
        if (PrecodeSetting == "true") {
            $('#LightSwitchPrecode').prop('checked', true);
            if ($('.LSPRECODE').length  < 1) {
                DisplayPrecode();
            }
        }
        if (Developer == "true") {
            $('#LightSwitchDeveloper').prop('checked', true);
            if ($('.LSDMODE').length  < 1) {
                DeveloperMode();
            }
        }
        if (Formats == "true") {
            $('#LightSwitchFormats').prop('checked', true);
            if ($('.LSFormats').length  < 1) {
                LightSwitchFormats();
            }
        }
        if(Robot == "true"){
			$('#LightSwitchRobot').prop('checked',true);
			timer = setTimeout(function() {
				$('#LightSwitchRandom').click();
			},2000);
		}
        if (Reminders == "true") {
            $('#LightSwitchReminders').prop('checked', true);
        }
        if (Robot == "false") {
            window.clearInterval(timer);
        }
        if (PrecodeSetting == "false") {
            $('.LSPRECODE').each(function () { $(this).remove(); });
        }
        if (Developer == "false") {
            $('.LSDMODE').each(function () { $(this).remove(); });
        }
       
		//if (AutoSubmit == "true") {
          // $('#LightSwitchAutoSubmit').prop('checked',true);
			//AutoSubmitTimer = setTimeout(function(){	
			//	$('#next').length  > 0 ? $('#next').click() : $('input[name="_NNext"]').click();
//			},1500);
  //      }
		if (AutoSubmit == "true") {
           $('#LightSwitchAutoSubmit').prop('checked',true);
			AutoSubmitTimer = setTimeout(function(){	
				$('#LightSwitchRandom').click();
				//$('#next').length  > 0 ? $('#next').click() : $('input[name="_NNext"]').click();
			},1500);
       }

        if (AutoSubmit == "false") {
            window.clearInterval(AutoSubmitTimer);
        }
        if (Formats == "false") {
            $('.LSFormats').each(function () {
                $(this).replaceWith($(this).contents());
            });
        }
    }
    function DisplayPrecode() {
        var obj = $('.mrQuestionTable').not('#LightSwitchSettingsBox');
        var Singles = obj.find('.mrSingleText').length  > 0 && obj.find('.mrSingle').length  > 0 && obj.find('.mrGridCategoryText').length  < 1;
        var Multi = obj.find('.mrMultipleText').length  > 0 && obj.find('.mrMultiple').length  > 0 && obj.find('.mrGridCategoryText').length  < 1;
        if (Singles || Multi) {
            obj.find(':radio,:checkbox').each(function () {
                $('<span class="LSPRECODE">[' + $(this).attr('value').replace('_', '') + ']</span>').insertAfter($(this));
            });
        }
    }
    function DeveloperMode() {
        var obj = $('.mrQuestionTable').not('#LightSwitchSettingsBox');
        obj.find('input').each(function () {
            $('<span class="LSDMODE">[' + $(this).attr('id') + ']</span>').insertAfter($(this));
        });
    }
    function LightSwitchFormats() {
        var obj = $('body');
        if ($('b,i,u,sup,sub,strong,a,.corner_label_text, .grid_header, .grid_footer').length  > 0) {
            obj.find('b,i,u,sup,sub,strong').wrap('<span class="LSFormats" style="background-color:#7fc0de"></span>');
			obj.find(".corner_label_text, .grid_header, .grid_footer").each(function(){
				var html=$(this).html();
				$(this).html("");
				$(this).append('<span class="LSFormats" style="background-color:#7fc0de">'+html+'</span>');
			});
			obj.find(".col_label_cell>.grid_options").each(function(){
				var html=$(this).html();
				$(this).html("");
				$(this).append('<span class="LSFormats" style="background-color:#7fc0de">'+html+'</span>');
			});
			$(".mrInstruct").css('background-color','#7fc0de');
        }
    }
    function QuestionProperties() {
        var ReqDat = {
            "PID": $('input:hidden[name="I.Project"]').attr('value'),
            "QID": $('input:hidden[name="I.SavePoint"]').attr('value')
        };
        return ReqDat;
    }
    chrome.runtime.onMessage.addListener(function ListeningMethod(request, sender, callback) {
        switch (request.action) {
            case "SubmitPage":
                $('input[name="_NNext"]').click();;
                break;
            case "ClearAnswers":
                $(':input,textarea', '#mrForm')
		 				.not(':button, :submit, :reset, :hidden')
		 				.val('')
		 				.removeAttr('checked')
		 				.removeAttr('selected');
                break;
            case "ResetPage":
                $('body').html(html);
                break;
            case "search":
                var RecText = request.data;
                doSearch(RecText);
                break;
            case "GiveMeDetails":
                callback({ attributes: QuestionProperties() });
                break;
        }
    });

    jQuery.jQueryRandom = 0;
    jQuery.extend(jQuery.expr[":"],
	{
	    random: function (a, i, m, r) {
	        if (i == 0) {
	            jQuery.jQueryRandom = Math.floor(Math.random() * r.length);
	        };
	        return i == jQuery.jQueryRandom;
	    }
	});
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function LightSwitchQuestionType(obj) {
        var Singles = obj.find('.mrSingleText').length  > 0 && obj.find('.mrSingle').length  > 0 && obj.find('.mrGridCategoryText').length  < 1;
        var Numeric = obj.find('.mrEdit').length  == 1 && obj.find('.mrGridCategoryText').length  < 1 && obj.find('.mrSingle').length  < 1 && obj.find('.mrMultiple').length  < 1;
        var NumericList = obj.find('.mrEdit').length  > 1 && obj.find('.mrGridCategoryText').length  > 0 && obj.find('.mrSingle').length  < 1 && obj.find('.mrMultiple').length  < 1;
        var Multi = obj.find('.mrMultipleText').length  > 0 && obj.find('.mrMultiple').length  > 0 && obj.find('.mrGridCategoryText').length  < 1;
        var SingleGrid = obj.find('.mrGridCategoryText').length  > 0 && obj.find('.mrSingle').length  > 0;
        var ThreeDGrid = obj.find('.mrGridCategoryText').length  > 0 && obj.find('.mrMultiple').length  > 0;
        var QID = QuestionProperties().QID;
        var PID = QuestionProperties().PID;
        if (Singles) {
            obj.find(':radio:random').each(function () {
                $(this).closest('td').siblings('td').find(':text').val(getRandomInt(1, 234));
                $(this).prop('checked', true);
            });
        }
        if (Multi) {
            obj.find(':checkbox.mrMultiple').each(function () {
                var type = $(this).prop('value');
                var Exclusives = ["NA", "DK", "REF", "Exclusive"];
                if (jQuery.inArray(type, Exclusives) > -1) {
                    $(this).addClass('single');
                }
                else {
                    $(this).addClass('multis');
                }
            });
            var randomSelector = getRandomInt(1, 3);
            if (randomSelector == 2) {
                obj.find(':radio.single:random').prop('checked', true);
                obj.find(':text').val('');
            }
            else {
                obj.find('.single').each(function () {
                    $(this).prop('checked', false);
                });
                obj.find('.multis').filter(function () {
                    return (Math.round(Math.random()) == 1);
                }).each(function () {
                    $(this).closest('td').siblings('td').find(':text').val(getRandomInt(1, 234));
                    $(this).prop('checked', true);
                });
            }
        }
        if (Numeric || NumericList) {
            obj.find('.mrEdit').each(function () {
                $(this).val(getRandomInt(11, 100));
            });
        }
        if (SingleGrid || ThreeDGrid) {
            obj.find('table tbody tr').each(function () {
                $(this).find('input:random').prop('checked', true);
            });
        }
        if (obj.find('select').length  > 0) {
            obj.find('select').each(function () {
                var value = $(this).find('option:random').val();
                $(this).val(value);
            });
        }
        if (obj.find(':text').length  > 0) {
            obj.find(':text').each(function () {
                $(this).closest('input').prop('checked', true);
                $(this).val(getRandomInt(18, 99));
            });
        }
    }
    function unhighlight() {
        $('body *').each(function () {
            ($(this).css('background-color') == "rgb(255, 102, 0)") || ($(this).css('background-color') == "rgb(210, 121, 121)") || ($(this).css('background-color') == "rgb(172, 180, 181)") ? $(this).css("background-color", "") : 0;
        });
		$('#MultiQ').css('background-color','rgb(255, 102, 0)');
		$('#AllQs').css('background-color','rgb(210, 121, 121)');
		$('#DupW').css('background-color','rgb(172, 180, 181)');
    }
	
    async function sInvoker() {
        try {
            let clipboardText = await navigator.clipboard.readText();
            if (!clipboardText.trim()) return;
    
            $('#NotFounds').remove();
            let frmtdData = $('<div></div>').append(clipboardText);
            let formats = { "b": [], "u": [], "s": [], "i": [], "sub": [], "sup": [] };
    
            frmtdData.find('b,i,s,u,sup,sub').each(function () {
                formats[this.nodeName.toLowerCase()].push($(this).text());
            });
    
            let a = ""; // Placeholder for formatting search if needed
            let b = doSearch(clipboardText.split('\n'));
    
            let st = "";
            if (b.length > 0) {
                st += "<center><h3>Mismatches</h3></center>";
                _.each(b, function (c, count) {
                    st += `<br><input type='checkbox'><i><b>${count + 1}</b></i>:   ${c}`;
                });
            }
            if (a.length > 0) {
                st += (st.length > 0 ? "<br>" : "") + "<center><h3>Formatting Warnings</h3></center>";
                _.each(a, function (c, count) {
                    st += `<br><input type='checkbox'><i><b>${count + 1}</b></i>:   ${c}`;
                });
            }
    
            if (st.length > 0) {
                $('body').prepend('<div id="NotFounds" style="width:100%; border:1px solid gray; background-color:#E6E6FA; max-height:200px; overflow:scroll"></div>');
                $('#NotFounds').html(st);
            }
        } catch (err) {
            console.error("Clipboard read failed:", err);
        }
    }
    
    
    // Attach it to double-click event
    $(document).dblclick(function () { 
        sInvoker(); 
    });
    

    function setupDragAndDrop() {
        
            const dropArea = document.createElement('div');
            dropArea.id = 'dropArea';
            dropArea.style.position = 'fixed';
            dropArea.style.top = '20px';
            dropArea.style.right = '90px';
            dropArea.style.zIndex = '1000';
            dropArea.style.border = '2px dashed #ccc';
            dropArea.style.padding = '35px';
            dropArea.style.textAlign = 'center';
            dropArea.style.background = '#fff';
            dropArea.style.width = '300px';
            dropArea.textContent = 'Please drag and drop the reinvites excel';
            document.body.appendChild(dropArea);
    
            // Handle dragover and dragleave events
            dropArea.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.stopPropagation();
                dropArea.style.backgroundColor = '#f0f0f0'; 
            });
    
            dropArea.addEventListener('dragleave', (event) => {
                event.preventDefault();
                event.stopPropagation();
                dropArea.style.backgroundColor = ''; 
            });
    
            // Handle file drop
            dropArea.addEventListener('drop', (event) => {
                event.preventDefault();
                event.stopPropagation();
                dropArea.style.backgroundColor = '';
    
                const file = event.dataTransfer.files[0];
                if (!file) {
                    alert('No file detected!');
                    return;
                }
    
                if (!file.name.endsWith('.xlsx')) {
                    alert('Please drop a valid Excel (.xlsx) file!');
                    return;
                }
    
                // Reading the Excel file
                const reader = new FileReader();
                reader.onload = function (e) {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0]; 
                    const sheet = workbook.Sheets[sheetName];
    
                    const links = [];
                    for (let row = 2; sheet['C' + row] != undefined; row++) { // Adjust the row and column format if necessary
                        const link = sheet['C' + row]?.v;
                        if (link) links.push(link);
                    }
    
                    if (links.length === 0) {
                        alert('No valid links found in the file!');
                        return;
                    }
    
                    // Send the links to the background script
                    chrome.runtime.sendMessage({ action: "openTabs", links: links }, (response) => {
                        if (response && response.status === "success") {
                            alert(response.message);
                            dropArea.style.display = 'none';
                        } else {
                            alert('Failed to open tabs.');
                            dropArea.style.display = 'none';
                        }
                    });
                };
                reader.readAsBinaryString(file);
            });
    
            // Hide the drop area on pressing the Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    dropArea.style.display = 'none';
                }
            });
        
    }
    
    
    // Initialize the drag-and-drop setup
    
    
    
    $('#NotFounds :checkbox').on('change', function () {
        if ($('#NotFounds :checkbox:checked').length  == $('#NotFounds :checkbox').length) {
            $('input[type="submit"]').show();
        }
        else {
            //$('input[type="submit"]').hide();
        }
    });
    $('#LightSwitchSearch').click(function () { sInvoker(); });
	$(document).keyup(function(event) {
       if (event.which == 27) {
			$('#NotFounds').remove();
			unhighlight();
			$('.mrErrorText').each(function () { $(this).detach(); });
			$('input[type="submit"]').show();
       }
   });
    $(document).dblclick(function () { sInvoker(); });
    function doSearch(textGroup) {
        var NotFounds = [];
        if (textGroup.length > 0) { if ($('#NotFounds').length  > 0) { $('#NotFounds').detach(); } }
        document.designMode = "on";
        _.each(textGroup, function (text) {
            text = text.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (text.length > 0) {
                text = _(text).clean();
                if (window.find && window.getSelection) {
                    var sel = window.getSelection(); sel.collapse(document.body, 0); document.body.offsetHeight;
                    if (window.find(text, true)) {
						var multisize = $('body').find('.mrMultiple').length ;
						var color1 = "rgb(210, 121, 121)", color2 = "rgb(172, 180, 181)";
						if (multisize>6) {
							color1 = "rgb(255, 102, 0)";
							color2 = "rgb(255, 0, 255)";
						}
                        document.execCommand("BackColor", false, color1);
                        while (window.find(text, true)) {
                            document.execCommand("BackColor", false, color2);
                        }
                        sel.collapseToEnd();
                    } else { NotFounds.push(text); }
                }
            }
        });
        document.designMode = "off";
        return NotFounds;
    }
    function doFSearch(obj) {
        var bolds = obj.b, italics = obj.i, underlines = obj.u, stikes = obj.s, superTexts = obj.sup, subTexts = obj.sub, NotFounds = [];
        _.each(bolds, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                document.designMode = "on";
                window.find(e);
                var isAllBold = document.queryCommandState("Bold");
                isAllBold == true ? 0 : NotFounds.push("<span style='color:red'>" + e + "</span> is not in Bold");
                window.getSelection().removeAllRanges();
                document.designMode = "off";
            }
        });
        _.each(italics, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                document.designMode = "on";
                window.find(e);
                var isAllBold = document.queryCommandState("Italic");
                isAllBold == true ? 0 : NotFounds.push("<span style='color:red'>" + e + "</span> is not in Italic");
                window.getSelection().removeAllRanges();
                document.designMode = "off";
            }
        });
        _.each(underlines, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                document.designMode = "on";
                window.find(e);
                var isAllBold = document.queryCommandState("Underline");
                isAllBold == true ? 0 : NotFounds.push("<span style='color:red'>" + e + "</span> is not given with Underline.");
                window.getSelection().removeAllRanges();
                document.designMode = "off";
            }
        });
        _.each(superTexts, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                document.designMode = "on";
                window.find(e);
                var isAllBold = document.queryCommandState("Superscript");
                isAllBold == true ? 0 : NotFounds.push("<span style='color:red'>" + e + "</span> is not given with Superscript.");
                window.getSelection().removeAllRanges();
                document.designMode = "off";
            }
        });
        _.each(subTexts, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                document.designMode = "on";
                window.find(e);
                var isAllBold = document.queryCommandState("Subscript");
                isAllBold == true ? 0 : NotFounds.push("<span style='color:red'>" + e + "</span> is not given with Subscript.");
                window.getSelection().removeAllRanges();
                document.designMode = "off";
            }
        });
        _.each(stikes, function (e) {
            e = e.replace(/^\s+|(\s+(?!\S))/mg, "");
            if (e.length > 0) {
                e = _(e).clean();
                var sel = window.getSelection(); sel.collapse(document.body, 0); document.body.offsetHeight;
                if (window.find(e, true)) {
                    NotFounds.push("<span style='color:red'>" + e + "</span> is striked off in word document but given in page. Please check this.");
                    sel.collapseToEnd();
                } else { NotFounds.push(text); }
            }
        });
        if (bolds.length == 0 && $(document).find('b').length  > 0) {
            $(document).find('b,strong').each(function () {
                NotFounds.push("<span style='color:red'>" + $(this).text() + "</span> is given in Bold. But it is in regular in Doc. Please check.");
            });
        }
        if (italics.length == 0 && $(document).find('i').length  > 0) {
            $(document).find('i').each(function () {
                NotFounds.push("<span style='color:red'>" + $(this).text() + "</span> is given in Italic. But it is in regular in Doc. Please check.");
            });
        }
        if (underlines.length == 0 && $(document).find('u').length  > 0) {
            $(document).find('u').each(function () {
                NotFounds.push("<span style='color:red'>" + $(this).text() + "</span> is given in Underline. But it is in regular in Doc. Please check.");
            });
        }
        if (superTexts.length == 0 && $(document).find('sup').length  > 0) {
            $(document).find('sup').each(function () {
                NotFounds.push("<span style='color:red'>" + $(this).text() + "</span> is given with superscript. But it is in regular in Doc. Please check.");
            });
        }
        if (superTexts.length == 0 && $(document).find('sub').length  > 0) {
            $(document).find('sub').each(function () {
                NotFounds.push("<span style='color:red'>" + $(this).text() + "</span> is given with subscript. But it is in regular in Doc. Please check.");
            });
        }
        return NotFounds;
    }
    $('#LightSwitchMatch').on('click', function () {
        sInvoker();
    });
    $('#LightSwitchInvites').on('click', function () {
        setupDragAndDrop();
    });
    
    $('#LightSwitchReset').on('click', function () {
        $('#NotFounds').remove();
        unhighlight();
        $('.mrErrorText').each(function () { $(this).detach(); });
        $('input[type="submit"]').show();
		alert('Now you can use "Escape" button to reset.');
    });
	
    $('#LightSwitchClear').on('click', function () {
		alert("clear form");
		$(':input,textarea', 'form[name="mainform"]').filter(function() { return !$(this).is(':button, :submit, :reset, :hidden, :disabled') && !$(this).prop('readonly'); }).val('').removeClass("x").removeAttr('checked').removeAttr('selected');
		$(".total.text_input").each(function(){
			var id;
			id=$(this).attr("id").split("_total")[1].substr(1);
			if(id=="")
			{
				id=$(this).attr("id").split("_")[1];
				if(!($(".grid_"+id+".row_label_cell").hasClass("cgrey")) && id.indexOf("r")>=0 && $(this).attr("id").indexOf("er_total")<0)
				{
					$(this).val("0");

				}
			}
			else if(!($(".grid_"+id+".col_label_cell").hasClass("cgrey")) && id.indexOf("c")>=0 && $(this).attr("id").indexOf("er_total")<0)
			{
				$(this).val("0");
			}
		});
    });
	
    $('#LightSwitchRandom').on('click', function () {
		$('.QuestionSpacing:first').prevUntil('.mrQuestionTable').addClass('QuestionArea');
        LightSwitchQuestionType($('.QuestionArea'));
        if ($('.QuestionSpacing').length  > 0) {
            $('.QuestionSpacing').each(function () {
                $('.MoreQuests').length  > 0 ? $('*').removeClass('MoreQuests') : 0;
                $(this).nextUntil('.QuestionSpacing').addClass('MoreQuests');
                LightSwitchQuestionType($('.MoreQuests'));
            });
        }
        $('#next').length  > 0 ? $('#next_button').click() : 0;
        $('input[name="_Next"]').click();
    });
	
	/* function to generate random words*/
	function generateRandomWords(numWords) {
		const words = [];
		 const randWords = ["Keytruda", "Pluvicto", "Wegovy", "Jardiance", "Farxiga", "Obesity", "T2D", "T1D", "Contraceptive", "Cancer", "Safety", "Efficacty", "Tolerability", "Dosage"];
		for (let i = 0; i < numWords; i++) {
			const randomIndex = Math.floor(Math.random() * randWords.length);
			words.push(randWords[randomIndex]);
		}
		return words.join(' ');
	}
	
	function getRandomElements(arr, n) {
		// Shuffle the array using Fisher-Yates algorithm
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
		}
		// Return the first 'n' elements of the shuffled array
		return arr.slice(0, n);
	}

	
    $('#LightSwitchSubmit').on('click', function () {
		
		var firstrowID, colms, idx1, totradiobtn, ranum, numofqsn, totoeboxes, isRanking, totchkboxes;
		totradiobtn = parseInt($(".graphical_select.radiobox").length);
		numofqsn = $(".grid.question").length;
		totnumbox = parseInt($(".numeric_input").length);
		total_boxes=parseInt($(".grid_totals_row").length);
		totoeboxes=parseInt($("textarea").length)+parseInt($(".open_end_text_box").length);
		isRanking=parseInt($(document).find('script:contains(SSI_RankCheck)').length);
		totchkboxes=parseInt($(".graphical_select.checkbox").length);
		
		if(totradiobtn>0 && totradiobtn>totchkboxes)
		{
			$(".grid.question").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_row_list_'+qname+'"]').val().split(",");
				colms=$('input[name="hid_col_list_'+qname+'"]').val().split(",");
				rowtype=$(".graphical_select.radiobox:visible:eq(0)").attr("id").indexOf("_r");
				coltype=$(".graphical_select.radiobox:visible:eq(0)").attr("id").indexOf("_c");
				if(rowtype>=0) //row wise radio grid
				{
					colms = parseInt(colms.length);
					rows.forEach(function(row){
						ranum = Math.floor((Math.random() * colms) + 1);
						idx = "#"+qname+"_r"+row+"_"+ranum;
						if($(idx).prev().is(":visible"))
						{
							$(idx).attr('checked','checked');
							$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
							$(idx).parent().siblings().find(".HideElement").removeAttr('checked');
							$(idx).parent().siblings().find(".graphical_select").addClass("radiobox").removeClass("radioboxselected");
						}
					});
				}
				if(coltype>=0) //column wise radio grid
				{
					rows = parseInt(rows.length);
					colms.forEach(function(col){
						ranum = Math.floor((Math.random() * rows) + 1);
						idx = "#"+qname+"_c"+col+"_"+ranum;
						if($(idx).prev().is(":visible"))
						{
							$("."+qname+"_c"+col).find(".HideElement").removeAttr('checked');
							$("."+qname+"_c"+col).find(".graphical_select").addClass("radiobox").removeClass("radioboxselected");
							$(idx).attr('checked','checked');
							$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
						}
					});
				}
			});
			$(".acarating.question").each(function(){
				qname=$(this).attr("id").split("_div")[0];
				noofcols=$(this).find(".inner_table>tbody>tr:eq(0)").find("td:gt(0)").length;
				nooflevels=$('input[name="hid_'+qname+'_levels"]').val();
				for(var nol=1;nol<=nooflevels;nol++)
				{
					ranum = Math.floor((Math.random() * noofcols) + 1);
					idx = "#"+qname+"_"+nol+"_"+ranum;
					$(idx).attr('checked','checked');
					$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
				}
			});
			$(".acaimportance.question").each(function(){
				qname=$(this).attr("id").split("_div")[0];
				noofcols=$(this).find(".inner_table>tbody>tr:eq(0)").find("td:gt(0)").length;
				ranum = Math.floor((Math.random() * noofcols) + 1);
				idx = "#"+qname+"_"+ranum;
				$(idx).attr('checked','checked');
				$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
			});
			$(".acapair.question").each(function(){
				qname=$(this).attr("id").split("_div")[0];
				noofcols=$(this).find(".footer>table>tbody>tr:eq(0)").find("td").length;
				ranum = Math.floor((Math.random() * noofcols) + 1);
				idx = "#"+qname+"_"+ranum;
				$(idx).attr('checked','checked');
				$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
			});
			$(".question.select").each(function(){
				qname=$(this).attr("id").split("_")[0];
				list=$('input[name="hid_list_'+qname+'"]').val().split(",");
				options=parseInt(list.length);
				ranum = Math.floor((Math.random() * options) + 1);
				idx = "#"+qname+"_"+ranum;
				$(idx).attr('checked','checked');
				$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
				
			});
			$(".semanticdiff.question").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_list_'+qname+'"]').val().split(",");
				noofcols=$(this).find(".inner_table>tbody>tr.column_header_row").find("td.col_label_cell").length;
				rows.forEach(function(row){
					ranum = Math.floor((Math.random() * noofcols) + 1);
					idx = "#"+qname+"_"+row+"_"+ranum;
					if($(idx).prev().is(":visible"))
					{
						$(idx).attr('checked','checked');
						$(idx).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
						$(idx).parent().siblings().find(".HideElement").removeAttr('checked');
						$(idx).parent().siblings().find(".graphical_select").addClass("radiobox").removeClass("radioboxselected");
					}
				});
			});
			$(".question.maxdiff").each(function(){
				qname=$(this).attr("id").split("_div")[0];
				rows=$(".inner_table").find("tr.body_row").length;
				branum = Number(Math.floor((Math.random() * rows) + 1))-1;
				browid=$(".inner_table").find("tr.body_row:eq("+branum+")").find(".best_input_cell>input").val();
				$(".body_row").find(".HideElement").removeAttr('checked');
				$(".body_row").find(".graphical_select").attr("aria-checked",true).addClass("radiobox").removeClass("radioboxselected");
				$("#"+qname+"_b_"+browid).attr('checked','checked');
				$("#"+qname+"_b_"+browid).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
				wranum = Number(Math.floor((Math.random() * rows) + 1))-1;
				wrowid=$(".inner_table").find("tr.body_row:eq("+wranum+")").find(".worst_input_cell>input").val();
				$("#"+qname+"_b_"+wrowid).attr('checked','checked');
				$("#"+qname+"_b_"+wrowid).prev().attr("aria-checked",true).addClass("radioboxselected").removeClass("radiobox");
			});
		}
		if(totnumbox>0 && isRanking==0)
		{
			max_num=100;
			var num=0;
			if($('div.footer').find('script:contains(max_num)').text().match(/max_num\s*=\s*\d+/))
			{
				num=Number($('div.footer').find('script:contains(max_num)').text().match(/max_num\s*=\s*\d+/)[0].split("=")[1]);
			}
			if(num>0)
			{
				max_num=num;
			}
			else
			{
				max_num=100;
			}
			max_num1=max_num;
			if($('div.footer').find('script:contains(restrict_zero)').text().match(/restrict_zero\s*=\s*(true|false)/))
			{
				var rz = $('div.footer').find('script:contains(restrict_zero)').text().match(/restrict_zero\s*=\s*(true|false)/)[0].split("=")[1].trim();
				rz = (rz === 'true'); // Convert the string 'true'/'false' to a boolean
			}
			$(".grid.question").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_row_list_'+qname+'"]').val().split(",");
				colms=$('input[name="hid_col_list_'+qname+'"]').val().split(",");		
				if(total_boxes>0)
				{
					colms.forEach(function(column){
						sum=0;
						max_num=max_num1;
						rows.forEach(function(row, index, array){	
							idx = "#"+qname+"_r"+row+"_c"+column;
							if(rz){ ranum = Math.floor(Math.random() * (max_num - 1 + 1)) + 1; }
							else { ranum = Math.floor(Math.random() * (max_num - 0 + 1)) + 0; }
							if(!($(idx).is(":disabled") || $(idx).prop("readonly") || $(idx).is(":hidden")) && sum<max_num1 && ranum>=0)
							{
								if (index === array.length - 1)
								{
									ranum=max_num;
								}
								$(idx).val(ranum);
								sum=sum+ranum;
								max_num=max_num1-sum;
								$("#"+qname+"_r_total_c"+column).val(sum);
							}
							else if((!($(idx).is(":disabled") || $(idx).prop("readonly") || $(idx).is(":hidden")) && sum>=max_num1 && ranum>=0) || ranum<0)
							{
								$(idx).val("0");
							}
						});
					});
				}
				else
				{
					colms.forEach(function(column){
						rows.forEach(function(row){	
							idx = "#"+qname+"_r"+row+"_c"+column;
							if(rz){ ranum = Math.floor(Math.random() * (max_num - 1 + 1)) + 1; }
							else { ranum = Math.floor(Math.random() * (max_num - 0 + 1)) + 0; }
							if(!($(idx).is(":disabled") || $(idx).prop("readonly") || $(idx).is(":hidden")))
							{
								$(idx).val(ranum);
							}
						});
					});
				}
			});
			if(rz){ ranum = Math.floor(Math.random() * (max_num - 1 + 1)) + 1; }
			else { ranum = Math.floor(Math.random() * (max_num - 0 + 1)) + 0; }
			$(".question.numeric").find(".numeric_input:enabled").val(ranum);
		}
		if(isRanking>0)
		{
			max_num=100;
			var num=0;
			if($('div.footer').find('script:contains(max_num)').text().match(/max_num\s*=\s*\d+/))
			{
				num=Number($('div.footer').find('script:contains(max_num)').text().match(/max_num\s*=\s*\d+/)[0].split("=")[1]);
			}
			if(num>0)
			{
				max_num=num;
			}
			else
			{
				max_num=100;
			}
			$(".grid.question").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_row_list_'+qname+'"]').val().split(",");
				colms=$('input[name="hid_col_list_'+qname+'"]').val().split(",");
				colms.forEach(function(column){
					const randomElements = getRandomElements(rows, max_num);
					for(var fill_count=1;fill_count<=max_num;fill_count++)
					{
						idx = "#"+qname+"_r"+randomElements[fill_count-1]+"_c"+column;
						if(!($(idx).is(":disabled") || $(idx).prop("readonly") || $(idx).is(":hidden")))
						{
							$(idx).val(fill_count);
						}
						
					}					
				});
			});
			$(".question.ranking").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_list_'+qname+'"]').val().split(",");
				const randomElements = getRandomElements(rows, max_num);
				for(var fill_count=1;fill_count<=max_num;fill_count++)
				{
					idx = "#"+qname+"_"+randomElements[fill_count-1];
					if(!($(idx).is(":disabled") || $(idx).prop("readonly") || $(idx).is(":hidden")))
					{
						$(idx).val(fill_count);
					}
				}
			});
		}
		if(totchkboxes>0 && totchkboxes>totradiobtn)
		{
			$(".question.select").each(function(){
				qname=$(this).attr("id").split("_")[0];
				list=$('input[name="hid_list_'+qname+'"]').val().split(",");
				var blch,rannum;
				list.forEach(function(list){
					rannum=Math.floor(Math.random() * 2);
					blch=(rannum==1)? true: false;
					idx = "#"+qname+"_"+list;
					if(blch) 
					{ 
						$(idx).attr('checked','checked'); $(idx).prev().attr("aria-checked",blch).addClass("checkboxselected").removeClass("checkbox"); 
					}
					else 
					{ 
						$(idx).removeAttr('checked'); $(idx).prev().attr("aria-checked",blch).addClass("checkbox").removeClass("checkboxselected"); 
					}
				});
			});
			$(".question.grid").each(function(){
				qname=$(this).attr("id").split("_")[0];
				rows=$('input[name="hid_row_list_'+qname+'"]').val().split(",");
				colms=$('input[name="hid_col_list_'+qname+'"]').val().split(",");
				var blch,rannum;
				colms.forEach(function(colm){
					rows.forEach(function(row){
						rannum=Math.floor(Math.random() * 2);
						blch=(rannum==1)? true: false;
						idx = "#"+qname+"_r"+row+"_c"+colm;
						if(blch) 
						{ 
							$(idx).attr('checked','checked'); $(idx).prev().attr("aria-checked",blch).addClass("checkboxselected").removeClass("checkbox"); 
						}
						else 
						{
							$(idx).removeAttr('checked'); $(idx).prev().attr("aria-checked",blch).addClass("checkbox").removeClass("checkboxselected"); 
						}
					});
				});
			});
		}
		/*if(totoeboxes>0)
		{
			$(".grid.question,.question.openend").each(function(){
				$(this).find("textarea,.open_end_text_box").each(function(){
					if($(this).attr("id").indexOf("other")<0)
					{
						//const randomString = generateRandomWords(5);
						const randomString = "Sample text generated by testing tool";
						$(this).val(randomString);
					}
				});
				
			});
		}*/
		$('#next_button').length  > 0 ? $('#next_button').click() : 0;
		$('#next_button').click();
		
    });
    var LightSwitchInitial = QuestionProperties();
    var LightSwitchReminders; //= localStorage.getItem(LightSwitchInitial.PID + "_Reminder").split('#');
    var DumLightSwitchVariable = JSON.parse(localStorage.getItem("LightSwitchSettings"));
    if (LightSwitchReminders && DumLightSwitchVariable.Reminders == "true") {
        var LightSwitchQIDS = LightSwitchInitial.QID;
        for (var ele = 0; ele < LightSwitchReminders.length; ele++) {
            var RemDatL = LightSwitchReminders[ele].split('*');
            if (LightSwitchQIDS == RemDatL[0]) {
                chrome.extension.sendRequest({ method: "notification", image: "i1.png", message: RemDatL[1], header: RemDatL[0] }, function (response) { });
            }
        }
    }
});



/*<span class="LightSwitchNavigators" id="LightSwitchSettingsBox"><input type="checkbox" id="LightSwitchAutoSubmit" style="height: 3px;width: 3px" class="mrMultiple form-control form-check-input"/><label for="LightSwitchAutoSubmit" style="margin-right: 3px">Auto Submit</label><input type="checkbox" style="height: 3px;width: 3px" id="LightSwitchPrecode" class="mrMultiple form-control form-check-input"/><label for="LightSwitchPrecode" style="margin-right: 3px">Precode</label><input type="checkbox" style="height: 3px;width: 3px" id="LightSwitchDeveloper" class="mrMultiple form-control form-check-input"/><label for="LightSwitchDeveloper" style="margin-right: 3px">Developer Mode</label><input type="checkbox" id="LightSwitchFormats" style="height: 3px;width: 3px" class="mrMultiple form-control form-check-input"/><label for="LightSwitchFormats" style="margin-right: 3px">Formattings</label><input type="checkbox" id="LightSwitchReminders" style="height: 3px;width: 3px" class="mrMultiple form-control form-check-input"/><label for="LightSwitchReminders" style="margin-right: 3px">Reminders</label><input type="checkbox" id="LightSwitchGOTO" style="height: 3px;width: 3px" class="mrMultiple form-control form-check-input"/><label for="LightSwitchGOTO" style="margin-right: 3px">GOTO</label></span>-->*/

