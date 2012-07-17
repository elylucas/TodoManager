var App = App || {};

(function() {

    App.TodoModel = function() {
        var self = this;
        self.Id = ko.observable(0);
        self.Description = ko.observable('');
        self.Done = ko.observable(false);
        return self;
    };

    App.TodoViewModel = function() {
        self = this;
        self.todos = ko.observableArray([]);
        self.todoTemp = ko.observable(new App.TodoModel());
        self.loadData = function() {
            self.todos([]); //clear existing data
            $.ajax("/api/todo", {
                type: "GET",
                contentType: "application/json",
                statusCode: {
                    200: function(data) {
                        var mappedTodos = $.map(data, function(item) {
                            var todo = new App.TodoModel()
                                .Id(item.Id)
                                .Description(item.Description)
                                .Done(item.Done);
                            return todo;
                        });
                        self.todos(mappedTodos);
                    }
                }
            });
            
        };
        self.addTodo = function(todo) {
            $.ajax("/api/todo/", {
                data: ko.toJSON(todo),
                type: "POST",
                contentType: "application/json",
                statusCode: {
                    200: function() {
                        self.loadData();
                        self.todoTemp(new App.TodoModel());
                    }
                }
            });
        };
        self.deleteTodo = function(todo) {
            $.ajax("/api/todo/" + todo.Id(), {
                type: "DELETE",
                contentType: "application/json",
                statusCode:
                    {
                        200: function() {
                            self.loadData();
                        }
                    }
            });
        };
        self.saveTodo = function(todo) {
            $.ajax("/api/todo/", {
                data: ko.toJSON(todo),
                type: "PUT",
                contentType: "application/json",
                statusCode: {
                    200: function() {
                        self.loadData();
                    }
                }
            });
        };
        return self;
    };

})();

$(function() {
    var todosViewModel = new App.TodoViewModel();
    todosViewModel.loadData();
    ko.applyBindings(todosViewModel);
});