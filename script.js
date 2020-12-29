function main() {
    // Initialize save
    mondayTasks = []
    tuesdayTasks = []
    wednesdayTasks = []
    thursdayTasks = []
    fridayTasks = []

    // They enter task
    function createTaskFromUser(day, dayID, taskList) {
        let input = document.getElementById(day).value;
        createTaskFromSave(input, dayID, taskList);
    }

    document.addEventListener('keypress', function(x) {
        if (x.key === 'Enter') {
            if (document.getElementById('monday').value != '') {
                var taskTextM = document.getElementById('monday').value;
                mondayTasks.push(taskTextM);
                chrome.storage.sync.set({'mondaySaved' : mondayTasks}, function() {
                    console.log('saved monday')
                });
                createTaskFromUser('monday', 'mondayList', mondayTasks);   
            }
            if (document.getElementById('tuesday').value != '') {
                var taskTextTU = document.getElementById('tuesday').value;
                tuesdayTasks.push(taskTextTU);
                chrome.storage.sync.set({'tuesdaySaved' : tuesdayTasks}, function() {
                    console.log('saved tuesday')
                });
                createTaskFromUser('tuesday', 'tuesdayList', tuesdayTasks);
            }
            if (document.getElementById('wednesday').value != '') {
                var taskTextW = document.getElementById('wednesday').value;
                wednesdayTasks.push(taskTextW);
                chrome.storage.sync.set({'wednesdaySaved' : wednesdayTasks}, function() {
                    console.log('saved wednesday')
                });
                createTaskFromUser('wednesday', 'wednesdayList', wednesdayTasks);
            }
            if (document.getElementById('thursday').value != '') {
                var taskTextTH = document.getElementById('thursday').value;
                thursdayTasks.push(taskTextTH);
                chrome.storage.sync.set({'thursdaySaved' : thursdayTasks}, function() {
                    console.log('saved thursday')
                });
                createTaskFromUser('thursday', 'thursdayList', thursdayTasks);
            }        
            if (document.getElementById('friday').value != '') {
                var taskTextF = document.getElementById('friday').value;
                fridayTasks.push(taskTextF);
                chrome.storage.sync.set({'fridaySaved' : fridayTasks}, function() {
                    console.log('saved friday')
                });
                createTaskFromUser('friday', 'fridayList', fridayTasks);
            }

            // remove text from input line after hitting enter
            let inputs = document.querySelectorAll('input');
            var i;
            for (i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }
        }
    })

    // They remove task
    function removeElement(e) {
        e.target.parentElement.removeChild(e.target);
        console.log(e);
    };

    function removeData(string, tasksList) {
        for (var counter = 0; counter < tasksList.length; counter++) {
            currentCount = tasksList[counter];
            if (string === currentCount) {
                tasksList.splice(counter, 1);
                chrome.storage.sync.set({'mondaySaved' : mondayTasks});
                chrome.storage.sync.set({'tuesdaySaved' : tuesdayTasks});
                chrome.storage.sync.set({'wednesdaySaved' : wednesdayTasks});
                chrome.storage.sync.set({'thursdaySaved' : thursdayTasks});
                chrome.storage.sync.set({'fridaySaved' : fridayTasks});
            };
        };
    };

    // Load button hit
    function getSavedList() {
        chrome.storage.sync.get(['mondaySaved', 'tuesdaySaved', 'wednesdaySaved', 'thursdaySaved', 'fridaySaved'], function(result) {
            try {
                if (result.mondaySaved.length > 0) {
                    for (var i = 0; i < result.mondaySaved.length; i++) {
                        createTaskFromSave(result.mondaySaved[i], 'mondayList', mondayTasks);
                        mondayTasks.push(result.mondaySaved[i]);
                    }
                }
            }
            catch (error) {
                console.log('no mondaySaved');
            }
            try {
                if (result.tuesdaySaved.length > 0) {
                    for (var i = 0; i < result.tuesdaySaved.length; i++) {
                        createTaskFromSave(result.tuesdaySaved[i], 'tuesdayList', tuesdayTasks);
                        tuesdayTasks.push(result.tuesdaySaved[i]);
                    }
                }
            }
            catch (error) {
                console.log('no tuesdaySaved');
            }
            try {        
                if (result.wednesdaySaved.length > 0) {
                    for (var i = 0; i < result.wednesdaySaved.length; i++) {
                        createTaskFromSave(result.wednesdaySaved[i], 'wednesdayList', wednesdayTasks);
                        wednesdayTasks.push(result.wednesdaySaved[i]);
                    }
                }
            }
            catch (error) {
                console.log('no wednesdaySaved');
            }
            try {
                if (result.thursdaySaved.length > 0) {
                    for (var i = 0; i < result.thursdaySaved.length; i++) {
                        createTaskFromSave(result.thursdaySaved[i], 'thursdayList', thursdayTasks);
                        thursdayTasks.push(result.thursdaySaved[i]);
                    }
                }
            }
            catch (error) {
                console.log('no thursdaySaved');
            }
            try {
                if (result.fridaySaved.length > 0) {
                    for (var i = 0; i < result.fridaySaved.length; i++) {
                        createTaskFromSave(result.fridaySaved[i], 'fridayList', fridayTasks);
                        fridayTasks.push(result.fridaySaved[i]);
                    }
                };
            }
            catch (error) {
                console.log('no fridaySaved');
            }
            console.log('button was clicked');
        });
    };

    function createTaskFromSave(element, tasksID, taskList) {
        let text = document.createTextNode(element);
        let li = document.createElement('li');
        li.appendChild(text);
        let currentTasks = document.getElementById(tasksID);
        currentTasks.appendChild(li);
        li.addEventListener('click', function(li) {
            removeElement(li);
            removeData(element, taskList);
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        var button = document.getElementById("saveButton");
        button.addEventListener('click', function() {
            getSavedList();
        });
    });
}

main()