import 'bootstrap/dist/css/bootstrap.min.css';
import react, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";

function Todoapp() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("LowToHigh");

  const [errors, setErrors] = useState({});

  const addTask = () => {
    let validation = {};

    if (!title.trim()) {
      validation.title = "Title is required";
    }

    if (!description.trim()) {
      validation.description = "Description is required"
    }

    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    if (editId !== null) {
      const updated = tasks.map((task) =>
        task.id == editId
          ? {
            ...task,
            title,
            description,
            priority,
          }
          : task
      );

      setTasks(updated);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setPriority("Low");
    setErrors({});
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setEditId(task.id);
  };

  const priorityValue = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  let filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "Active") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (filter === "Completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  filteredTasks.sort((a, b) => {
    if (sort === "LowToHigh") {
      return priorityValue[a.priority] - priorityValue[b.priority];
    }

    return priorityValue[b.priority] - priorityValue[a.priority];
  });
  return (
    <>
      <Container className='py-5'>
        <Card className='shadow-lg border-0'>
          <Card.Header className="text-center text-white"
            style={{
              background: "linear-gradient(90deg,#4e54c8,#8f94fb)"
            }}
          >
            <h2> Todo Managment System</h2>
          </Card.Header>

          <Card.Body>

            <Row className='mb-4'>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Enter Task Title'
                    value={title}
                    isInvalid={!!errors.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Control.Feedback type='invaild'>
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    isInvalid={!!errors.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={2} className='d-flex align-items-end'>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={addTask}
                >
                  {editId ? "Update Task" : "Add Task"}
                </Button>
              </Col>

            </Row>
{/* 
            <InputGroup className='mb-4'>
              <Form.Control
                placeholder='Serach Task...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup> */}

            <Row className='mb-4'>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Filter Tasks</Form.Label>
                  <Form.Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All Tasks</option>
                    <option value="Active">Active Tasks</option>
                    <option value="Completed">Completed Tasks</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* <Col md={6}>
                <Form.Group>
                  <Form.Label>Sort By Priority</Form.Label>
                  <Form.Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="LowToHigh">
                      Low → High
                    </option>

                    <option value="HighToLow">
                      High → Low
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col> */}
            </Row>

            {/* <Row className='text-center mb-4'>
              <Col md={4}>
                <Card bg="primary" text="white">
                  <Card.Body>
                    <h3>{tasks.length}</h3>
                    <h6>Total Tasks</h6>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card bg="success" text="white">
                  <Card.Body>
                    <h3>
                      {
                        tasks.filter(
                          (task) => task.completed
                        ).length
                      }
                    </h3>
                    <h6>Completed</h6>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card bg="warning">
                  <Card.Body>
                    <h3>
                      {
                        tasks.filter(
                          (task) => !task.completed
                        ).length
                      }
                    </h3>
                    <h6>Pending</h6>
                  </Card.Body>
                </Card>
              </Col>

            </Row> */}

            <Row>
              {filteredTasks.length === 0 ? (
                <Col>
                  <Card className="shadow-sm border-0">
                    <Card.Body className="text-center py-5">
                      <h4 className="text-secondary">
                        No Tasks Found
                      </h4>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                filteredTasks.map((task) => (
                  <Col md={6} lg={4} className="mb-4" key={task.id}>
                    <Card
                      className="shadow border-0 h-100"
                      style={{
                        borderLeft: task.completed
                          ? "6px solid green"
                          : "6px solid orange",
                      }}
                    >
                      <Card.Body>

                        <div className="d-flex justify-content-between align-items-center mb-2">

                          <h4
                            style={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.title}
                          </h4>

                          <Badge
                            bg={
                              task.completed
                                ? "success"
                                : "warning"
                            }
                          >
                            {task.completed
                              ? "Completed"
                              : "Pending"}
                          </Badge>

                        </div>

                        <p className="text-muted">
                          {task.description}
                        </p>

                        <p>
                          <strong>Priority : </strong>

                          <Badge
                            bg={
                              task.priority === "High"
                                ? "danger"
                                : task.priority === "Medium"
                                  ? "warning"
                                  : "primary"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </p>

                        <div className="d-flex gap-2 flex-wrap">

                          <Button
                            variant={
                              task.completed
                                ? "secondary"
                                : "success"
                            }
                            onClick={() =>
                              toggleComplete(task.id)
                            }
                          >
                            {task.completed
                              ? "Undo"
                              : "Complete"}
                          </Button>

                          <Button
                            variant="warning"
                            onClick={() => editTask(task)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() =>
                              deleteTask(task.id)
                            }
                          >
                            Delete
                          </Button>

                        </div>

                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Todoapp