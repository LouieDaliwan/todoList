import React, { Component } from "react";
import { Button } from "reactstrap";
import { 
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle

} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2AA4CFF",
        }
    }
})

export default class EditTodo extends Component {
    render() {
        return (
            <div>
                <Dialog 
                    fullWidth
                    open={this.props.editTaskDataModal}
                    onClose={this.props.onChangeEditTodoHandler}
                    modal={false}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>Todo List</DialogContentText>
                    <div className="input-field-container">
                        <ThemeProvider theme={theme}>
                            <TextField 
                                autoFocus
                                type="text"
                                name="title"
                                placheholder="Task Title"
                                value={this.props.editTaskData.title}
                                onChange={this.props.onChangeEditTodoHandler}
                                className="task-title"
                                color="primary"
                                variant="outlined"
                                style={{ width: "35%"}}
                            />
                            <TextField 
                                type="text"
                                name="description"
                                placeholder="Task Description"
                                value={this.props.editTaskData.description}
                                onChange={this.props.onChangeEditTodoHandler}
                                color="primary"
                                variant="outlined"
                                style={{ width: "35%" }}
                            />
                        </ThemeProvider>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.toggleEditTaskModal} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.props.updateTodo}
                        color="success"
                        className="font-weight-bold add-task"
                    >
                        Update
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}