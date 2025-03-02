/* function paste() {
        var result = '';
		
		var sandbox = $("#sandbox").val('').select();
			alert(sandbox.val()+"test");
        if (document.execCommand('paste')) {
			alert(sandbox.val());
			result = sandbox.val();paste
			//setTimeout(function() {
            //alert(sandbox.val());
          //}, 0);
			alert("CALLED PASTE INSIDE");
			alert(sandbox.html());
			
        }
        sandbox.val('');
        return result;
    } */
	function getClipboard() {
    var pasteTarget = document.createElement("div");
    pasteTarget.contentEditable = true;
    var actElem = document.activeElement.appendChild(pasteTarget).parentNode;
    pasteTarget.focus();
    document.execCommand("Paste", null, null);
    var paste = pasteTarget.innerText;
    actElem.removeChild(pasteTarget);
    return paste;
};
    function pasteWithFormats() {
        $('body').append('<div id="sandbox1" contenteditable="true"></div>');
        var result = '',
            sandbox = $('#sandbox1').focus();
        if (document.execCommand('paste')) {
            result = sandbox.html();
        }
        $('#sandbox1').detach();
        return result;
    }
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		  if (request.action === "openTabs" && Array.isArray(request.links)) {
        request.links.forEach((link) => {
			let modifiedLink = link.endsWith('?') ? link + 'rein=1' : link + '&rein=1';
            chrome.tabs.create({ url: modifiedLink, active: false }, (tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        const nextButton = document.getElementById('next_button');
                        if (nextButton) nextButton.click();
                    },
                });
            });
        });
        sendResponse({ status: "success", message: `${request.links.length} tabs opened.` });
    }
		           
        if (request.method == "getClipText") {
			var a = getClipboard();
            var b = pasteWithFormats();
            sendResponse({ data: a, frmtdData: b });
        }
        else
			sendResponse({}); // snub them.
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.method == "notification") {
            var notify = webkitNotifications.createNotification("" + request.image, request.header, request.message);
            notify.show();
        } else sendResponse({});
    });
function report(pid){
	var data = localStorage.getItem(pid);
	return data;
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.method == "passThisXML"){
		var dat = request.key;
		var ProjectName = request.MDDName;
		sendResponse({data: passThisMDD(dat,ProjectName.replace('.MDD',''))});
    }
	else
		sendResponse({}); // snub them.
});
function passThisMDD(XMLstr,Project){
	var xmlDoc = $.parseXML(XMLstr);
	var xml = $(xmlDoc);
	var ProjectName = Project + "_Report";
	var Report ={
					"Questions" : []
				};
	xml.find('definition variable').each(function(){
		var Record = {};
		var CurrentQuestionObject = $(this);
		var QID = $(this).attr('name');
		Record['Question'] = QID;
		CurrentQuestionObject.find('properties property').each(function(){
			Record[''+$(this).attr('name')+''] = $(this).attr('value');
		});
		var exclusives = [], KeepPositioned = [];
		CurrentQuestionObject.find('categories category').each(function(){
			if($(this).attr('exclusive')){
				exclusives.push($(this).attr('name'));
			}
			if($(this).attr('fixed') && !$(this).attr('exclusive')){
				KeepPositioned.push($(this).attr('name'));
			}
		});
		if(exclusives.length > 0){
			Record['Exclusives'] = exclusives;
		}
		if(KeepPositioned.length > 0){
			Record['Keep Positioned'] = KeepPositioned;
		}
		if(CurrentQuestionObject.attr('min')){
			Record['min'] = CurrentQuestionObject.attr('min');
		}
		if(CurrentQuestionObject.attr('max')){
			Record['max'] = CurrentQuestionObject.attr('max');
		}
		Report.Questions.push(Record);
	});
	xml.find('loop').each(function(){
		var Record = {};
		var CurrentQuestionObject = $(this);
		var QID = $(this).attr('name');
		Record['Question'] = QID;
		CurrentQuestionObject.find('properties property').each(function(){
			Record[''+$(this).attr('name')+''] = $(this).attr('value');
		});
		CurrentQuestionObject.find('fields variable').each(function(){
				ScaleQuestion = xml.find('definition').find('#'+$(this).attr('ref'));
				var Name = ScaleQuestion.attr('name');
				ScaleQuestion.find('properties property').each(function(){
					Record['Scale '+$(this).attr('name')+''] = $(this).attr('value');
				});
				var exclusives = [], KeepPositioned = [];
				ScaleQuestion.find('categories category').each(function(){
					if($(this).attr('exclusive')){
						exclusives.push($(this).attr('name'));
					}
					if($(this).attr('fixed') && !$(this).attr('exclusive')){
						KeepPositioned.push($(this).attr('name'));
					}
				});
				if(exclusives.length > 0){
					Record[Name + 'Exclusives'] = exclusives;
				}
				if(KeepPositioned.length > 0){
					Record[Name + 'Keep Positioned'] = KeepPositioned;
				}
				if(ScaleQuestion.attr('min')){
					Record[Name + 'min'] = ScaleQuestion.attr('min');
				}
				if(ScaleQuestion.attr('max')){
					Record[Name + 'max'] = ScaleQuestion.attr('max');
				}
		});
		Report.Questions.push(Record);
	});
	localStorage.setItem(ProjectName,JSON.stringify(Report));
	alert('Success, Please reload page.');
	return (JSON.stringify(Report));
}
	function refQuestionFinder(xml,ref){
		return xml.find('definition variable#'+ref);
	}
	function alertIT(str){
		alert(str);
	}
