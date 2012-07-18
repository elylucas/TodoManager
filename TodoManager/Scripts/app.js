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
        self.tempTodo = ko.observable(new App.TodoModel());
        self.loadData = function() {
            self.todos([]);
            $.ajax("/api/todo", {
                type: "GET",
                contentType: "appliation/json",
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
        self.addTodo = function (todo) {
            $.ajax("/api/todo/", {
                data: ko.toJSON(todo),
                type: "POST",
                contentType: "application/json",
                statusCode: {
                    201: function () {
                        self.loadData();
                        self.tempTodo(new App.TodoModel());
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
        self.deleteTodo = function (todo) {
            $.ajax("/api/todo/" + todo.Id(), {
                type: "DELETE",
                contentType: "application/json",
                statusCode: {
                    200: function () {
                        self.loadData();
                    }
                }
            });
        };
        return self;
    };

})();

$(function() {
    var todoViewModel = new App.TodoViewModel();
    todoViewModel.loadData();
    ko.applyBindings(todoViewModel);
});