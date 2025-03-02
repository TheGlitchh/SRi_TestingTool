
		$(document).ready(function(){
			const script11 = document.createElement('script');
			
				
					
				var bgPage = chrome.extension.getBackgroundPage();
        		$('a.LightSwitchNavigators').click(function(e){
        			e.preventDefault();
        		});
        		$('.LightSwitchMenuItem').live('click',function(){
        			$(this).next('tr.LightSwitchBox').toggle('slow');
        			$(this).parents('#LightSwitchMenuBoxes').find('tr.LightSwitchBox').not($(this).next('tr.LightSwitchBox')).hide();
        		});
        		$('#LightSwitchPropertiesTR').click();
				
        		$('#LightSwitchMatch').live('click',function(){
				alert("from tester1");
					var dat =  bgPage.paste();
					chrome.tabs.getSelected(null, function(tab) {
						chrome.tabs.sendRequest(tab.id, {
		                                     'action': 'search',
		                                     'data'  : dat
						});
					});
        		});
        		$('#LightSwitchClear').live('click',function(){
        			chrome.tabs.getSelected(null, function(tab) {
						chrome.tabs.sendRequest(tab.id, {
		                                     'action': 'ClearAnswers'
						});
					});
        		});
        		$('#LightSwitchSubmit').live('click',function(){
        			chrome.tabs.getSelected(null, function(tab) {
						chrome.tabs.sendRequest(tab.id, {
		                                     'action': 'SubmitPage'
						});
					});
        		});
        		chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendRequest(tab.id, {action: "GiveMeDetails"}, function(response){
						PropertyChange(response.attributes);
					});
				});
				function PropertyChange(data){
					var PID = data.PID + "_Report";
					var bgPage = chrome.extension.getBackgroundPage();
					var QID = data.QID;
					$('#PID').html(data.PID);
					$('#QID').html(data.QID);
					var Report = JSON.parse(localStorage.getItem(PID));
					var str = "<center><table>";
					var QuestData = Report.Questions;
					for(var i=0;i<QuestData.length;i++){
						var Record = QuestData[i];
						if(Record['Question'] == QID){
							str += "<tr><td colspan='3'><center><font style='color:green'><b>"+Record['Question']+"</b></font><center></td></tr>";
							for(var prop in Record){
								if(prop != "Question"){
									str = str + "<tr><td style='width:110px'><center><font style='font-weight:bold;font-size:10px'>"+prop+"</font></center></td><td style='width:20px'><center>  :  </center></td><td style='width:250px'><span class='RetData'>"+Record[prop]+"</span></td></tr>";
								}
							}
						}
					}
					str = str +"</table></center>";
					$('td#LightSwitchPropertiesBox').html(str);
				}
				$('#LightSwitchAddNoteButton').live('click',function(){
					var PID = $('#PID').html();
					var QID = $('#QID').html();
					var NoteType;
					if($('#LightSwitchNote').prop('checked') == true){
						NoteType = PID + "_Note";
					}
					else if($('#LightSwitchReminder').is(':checked')){
						NoteType = PID + "_Reminder";
					}
					var Note = $('#LightSwitchNotepadArea').val();
					if(PID !== null && QID !== null && NoteType !== null && Note !== null){
							var Data = "#" + QID + "*" + Note;
							if(localStorage.getItem(NoteType) === null){
								localStorage.setItem(NoteType,Data);
							}
							else{
								var PreVData = localStorage.getItem(NoteType) + Data;
								localStorage.setItem(NoteType,PreVData);
							}
					}
					$('#LightSwitchNotepadArea').val('');
				});
				function LightSwitchNotesUpdater(){
					var PID = $('#PID').html();
					var NoteType;
					if($('#LightSwitchNote').prop('checked') == true){
						NoteType = PID + "_Note";
					}
					else if($('#LightSwitchReminder').is(':checked')){
						NoteType = PID + "_Reminder";
					}
					var data = localStorage.getItem(NoteType);
					bgPage.alertIT(data);
					if(data !== null){
						var AllNotes = data.split('#');
						var str = "<center><table width='90%' id='LightSwitchDynNote'>";
						for(var i=0;i<AllNotes.length;i++)
						{
							if(AllNotes[i]){
								var x = AllNotes[i].split('*');
								str = str + "<tr class='LightSwitchDynNoteTR'><td><input type='checkbox' class='LightSwitchNoteFinalizer'></td><td style='width:40px' contenteditable='true' class='LightSwitchDynNoteQ'>" + x[0] + "</td><td style='width:20px'>:</td><td style='width:230px;max-width:230px;word-wrap:break-word;' contenteditable='true'  class='LightSwitchDynNoteM'>" + x[1] + "</td></tr>";
							}
						}
						str += "</table></center>";
						$('#LightSwitchNotepadExportArea').html(str);
					}
					else{
						$('#LightSwitchNotepadExportArea').html("No Data Found!");
					}
				}
				$('.LightSwitchNoteEXP').live('change',function(){
					LightSwitchNotesUpdater();
				});
				$('#LightSwitchNoteDeleteButton').live('click',function(){
					$('input.LightSwitchNoteFinalizer').filter(':checked').each(function(){
			      		$(this).closest('tr').detach(); 
			   		});
					LightSwitchSaveNow();
					LightSwitchNotesUpdater();
				});
				function LightSwitchSaveNow(){
					var str = "";
					$('#LightSwitchDynNote').find('tr.LightSwitchDynNoteTR').each(function(){
						var Q = $(this).find('.LightSwitchDynNoteQ').text();
						var M = $(this).find('.LightSwitchDynNoteM').text();
						str = str + "#"+Q+"*"+M;
						var PID = $('#PID').html();
						var NoteType;
						if($('#LightSwitchNote').prop('checked') == true){
							NoteType = PID + "_Note";
						}
						else if($('#LightSwitchReminder').is(':checked')){
							NoteType = PID + "_Reminder";
						}
						localStorage.setItem(NoteType,str);
					});
				}
				$('#LightSwitchNoteSaveButton').live('click',function(){
					LightSwitchSaveNow();
					LightSwitchNotesUpdater();
				});
				/*$('#LightSwitchCodeInjectButton').live('click',function(){
					var CodeType = "";
					if($('#LightSwitchScriptSelector').prop('checked') == true){
						CodeType = "script";
					}
					else if($('#LightSwitchStyleSelector').is(':checked')){
						CodeType = "style";
					}
					var code = $('#LightSwitchCodepadArea').val();
					code = "<"+CodeType+">"+code+"</"+CodeType+">";
					if($('#LightSwitchAppendSelector').prop('checked') == true){
						$('body').append('<span class="LightSwitchCoder">'+code+'</span>');
					}
					else if($('#LightSwitchNewInjSelector').is(':checked')){
						$('body').find('.LightSwitchCoder').each(function(){
							$(this).remove();
							$('body').append('<span class="LightSwitchCoder">'+code+'</span>');
						});
					}
				});
				*/
        });
	