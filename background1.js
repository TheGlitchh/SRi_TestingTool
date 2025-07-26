async function getClipboard() {
    try {
        let text = await navigator.clipboard.readText();
        console.log("Clipboard Text:", text);
        return text;
    } catch (err) {
        console.error("Clipboard read failed:", err);
        return "test"; // Return empty if clipboard read fails
    }
}

async function pasteWithFormats() {
    try {
        let text = await navigator.clipboard.readText();
        let formattedText = `<div>${text.replace(/\n/g, "<br>")}</div>`; // Simple HTML formatting
        console.log("Formatted Clipboard Content:", formattedText);
        return formattedText;
    } catch (err) {
        console.error("Clipboard formatted read failed:", err);
        return "test";
    }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openTabs" && Array.isArray(request.links)) {
        (async () => {
            for (let link of request.links) {
                let modifiedLink = link.includes('?') ? link + '&rein=1' : link + '&rein=1';
                let tab = await browser.tabs.create({ url: modifiedLink, active: false });

                try {
                    await browser.tabs.executeScript(tab.id, {
                        code: `
                            (function() {
                                let nextButton = document.getElementById('next_button');
                                if (nextButton) nextButton.click();
                            })();
                        `
                    });
                } catch (err) {
                    console.error("Script execution error:", err);
                }
            }
            sendResponse({ status: "success", message: `${request.links.length} tabs opened.` });
        })();
        return true; // Required for async response
    }

    if (request.method === "getClipText") {
        (async () => {
            let a = await getClipboard();
            let b = await pasteWithFormats();
            sendResponse({ data: a, frmtdData: b });
        })();
        return true; // Required for async response
    }
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
