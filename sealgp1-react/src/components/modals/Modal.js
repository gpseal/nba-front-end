import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import AddEditTeamForm from "../forms/AddEditTeamForm";
import EditTeamForm from "../forms/EditTeamForm";

const ModalForm = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <Button className="close" onClick={toggle}>
      &times;
    </Button>
  );

  console.log(props.data)

  const label = props.buttonLabel;

  let button = "";
  let title = "";
  let submitForm = "";

  if (label === "Edit") {
    button = (
      <Button
        color="warning"
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );

    if (props.data) {
      submitForm = (
        <EditTeamForm
          label={label}
          createResource={props.createResource}
          updateResource={props.updateResource}
          toggle={toggle}
          data={props.data}
        />
      );
    }
  } else {
    button = (
      <Button
        color="success"
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );

    if (label === "Add Team") {
      title = "Add New Team";
      submitForm = (
        <EditTeamForm
          createResource={props.createResource}
          toggle={toggle}
        />
      );
    }
  }

  return (
    <>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>{submitForm}</ModalBody>
      </Modal>
    </>
  );
}

export default ModalForm;
