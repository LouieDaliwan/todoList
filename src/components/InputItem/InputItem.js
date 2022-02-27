import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import { TextField } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import TodoList  from "../TodoList/TodoList";
import EditTodo from "../EditTodo/EditTodo";
import "./style.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2AA4CFF"
        }
    }
});

export default class InputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskData: {
                title: "",
                description: "",
                status: "",
            },
            showTaskData: [],
            successAlertMsg: "",
            todoDeleteMsg: "",
            editTaskDataModal: false,
            editTaskData: {
                title: "",
                description: "",    
            },
            successTodoUpdateMsg: "",
        };
    }

    componentDidMount() {
        this.getTaskData();
    }

    addItem = () => {
        let token = sessionStorage.getItem("token");
        var formdata = new FormData();

        formdata.append("title", this.state.taskData.title);
        formdata.append("description", this.state.taskData.description);

        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch("https://todo.programmingfields.com/api/user/todos", requestOptions)
        .then((response) =>  response.json())
        .then((result) => {
            if (result.status === "success") {
                this.setState({ successAlertMsg: result.message }, () => 
                    this.getTaskData()
                );
                setTimeout(() => {
                    this.setState({ successAlertMsg: ""});
                }, 1000);
            }

            if (result.error === false) {
                this.setState({
                    taskData: {
                        title: "",
                        description: "",
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };

    getTaskData() {
        
        let token = sessionStorage.getItem("token");
        
        var requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        fetch("https://todo.programmingfields.com/api/user/todos", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.status === "success") {
                this.setState({
                    showTaskData: result.data,
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeHandler = (e) => {
        const { taskData } = this.state;
        taskData[e.target.name] = e.target.value;
        console.log((taskData[e.target.name] = e.target.value));
        this.setState({ taskData });
    };

    clearList = () => {
        this.setState({
            showTaskData: [],
        });
    };

    handleDelete = (id) => {
        let token = sessionStorage.getItem("token");
        var requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            "https://todo.programmingfields.com/api/user/todos" + id,
            requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            if (result.status === "success") {
                this.setState(
                    {
                        todoDeleteMsg: result.message,
                    },
                    () => this.getTaskData()
                );
                setTimeout(() => {
                    this.setState({ todoDeleteMsg: "" });
                }, 1000)
            }
        });
    };

    onChangeEditTodoHandler = (e) => {
        let { editTaskData } = this.state;
        editTaskData[e.target.name] = e.target.value;
        this.setState({ editTaskData });
    };

    editTodo = (id, title, description) => {
        this.setState({
            editTaskData: { id, title, description },
            editTaskDataModal: !this.state.editTaskDataModal,
        })
    }

    updateTodo = () => {
        let {id, title, description} = this.state.editTaskData;
        let token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.appent("Content-type", "appliaction/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("description", description);

        var requestOptions =  {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
        };

        fetch(
            "https://todo.programmingfields.com/api/user/todos/" + id,
            requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            if (result.status === "success") 
                    {
                        this.setState({
                            ediTaskDataModal: false,
                            editTaskData: {title, description},
                        },
                    () => this.getTaskData()
                );
            }

            if ( result.errors === false) {
                this.setState({
                    successTodoUpdatedMsg: result.message,
                });
            }
        })
        .catch((error) => console.log("error", error));
    };

    render() {

        const {title, description} = this.state.taskData;

        if (this.state.isLoggeIn === false) {
            return <Navigate to="/log-in" />;
        }

        return (
            <Container className="themed-container mt-5" fluid="sm">
                <div classname="input-field-container">
                    <ThemeProvider theme={theme}>
                        <TextField
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={title}
                            onChange={this.onChangeHandler}
                            color="primary"
                            variant="outlined"
                        />
                        <TextField 
                            type="text"
                            name="description"
                            placeholder="Task Description"
                            value={description}
                            onChange={this.onChangeHandler}
                            color="primary"
                            variant="outlined"
                            style={{ width: "50%" }}
                        />
                        <Button
                            color="success"
                            className="font-weight-bold add-task"
                            onClick={this.addItem}
                        >
                            +
                        </Button>
                    </ThemeProvider>
                </div>
                <TodoList
                    showTaskData={this.state.showTaskData}
                    clearList={this.clearList}
                    handleDelete={this.handleDelete}
                    todoDeleteMsg={this.state.todoDeleteMsg}
                    editTodo={this.editTodo}
                    toggleEditTaskModal={this.toggleEditTaskModal}
                />
                <EditTodo
                    toggleEditTaskModal={this.toggleEditTaskModal}
                    editTaskDataModal={this.state.editTaskDataModal}
                    onChangeEditTodoHandler={this.onChangeEditTodoHandler}
                    editTodo={this.editTodo}
                    editTaskData={this.state.editTaskData}
                    updateTodo={this.updateTodo}
                    successTodoUpdatedMsg={this.state.successTodoUpdatedMsg}
                />
            </Container>
        )
    }
}