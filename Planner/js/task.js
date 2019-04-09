$(document).ready(function() {
    $('#addTask').focus();

    $('#addTask').button({
        icons: {
            primary: 'ui-icon-circle-plus'
        }
    }).click(function() {
        $('#newTaskDialog').dialog('open');
    });

    $('#newTaskDialog').dialog({
        modal: true,
        autoOpen: false,
        buttons: {
            "Добавить": addEntry,
            "Отмена": function() {
                $(this).dialog('close');
            }
        },
        close: function () {
            $('#newTaskDialog input').val('');
        }
    });

    function addEntry() {
        var taskName = $('#task').val();
        if (taskName === '') {
            return false;
        }
        var taskHTML = '<li><span class="done">V</span>';
        taskHTML += '<span class="delete">X</span>';
        taskHTML +='<span class="task"></span></li>';

        var $newTask = $(taskHTML);

        $newTask.find('.task').text(taskName);

        $newTask.hide();

        $('#planned-list').prepend($newTask);

        $newTask.show('clip', 250).effect('highlight', 1000);
        $('#newTaskDialog').dialog('close');
    }
    $('#newTaskDialog input').keypress(function(event) {
        if(event.keyCode == 13) {
            addEntry();
        }
    });

    $('.sortlist').on('click', '.delete', function () {
        $(this).parent('li').effect('puff', function () {
            $(this).remove();
        })
    });

    $('#planned-list').on('click', '.done', function() {
        var $taskItem = $(this).parent('li');
        $taskItem.slideUp(250, function () {
            var $this = $(this);
            $('#completed-list').prepend($this);
            $this.slideDown();
        });
    });

    $('.sortlist').sortable({
        connectWith: '.sortlist',
        cursor: 'pointer',
        placeholder: 'ui-state-highlight',
        cancel: '.delete, .done'
    });
});