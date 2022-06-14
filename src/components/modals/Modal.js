import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import AddEditTeamForm from "../forms/AddEditTeamForm";
import EditTeamForm from "../forms/EditTeamForm";
import EditPlayerForm from "../forms/EditPlayerForm";
import EditCoachForm from "../forms/EditCoachForm";
import './ModalCSS.css'

const buttonStyle = {
  filter: 'brightness(0.4)',
  color: 'white',
  textDecoration: 'none',
  padding: '3px 15px',
  transition: '0.3s',
  borderRadius: '3px',
  border: 'none'
};

const ModalForm = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <Button className="close" onClick={toggle}>
      &times;
    </Button>
  );

  // console.log(props.data)

  const label = props.buttonLabel;

  let button = "";
  let title = "";
  let submitForm = "";

  if (label === "Edit") {
    button = (
      <Button
        color="secondary"
        // style={buttonStyle}
        // className="button"
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );

    if (props.data) {
        switch (props.category) {
            case "teams":
                submitForm = (
                    <EditTeamForm
                      label={label}
                      category={props.category}
                      createResource={props.createResource}
                      updateResource={props.updateResource}
                      toggle={toggle}
                      data={props.data}
                    />
                  );
                break;
            
            case "players":
                submitForm = (
                    <EditPlayerForm
                      label={label}
                      category={props.category}
                      createResource={props.createResource}
                      updateResource={props.updateResource}
                      toggle={toggle}
                      data={props.data}
                      teamList={props.teamList}
                    />
                  );
                break;

            case "coaches":
              submitForm = (
                  <EditCoachForm
                    label={label}
                    category={props.category}
                    createResource={props.createResource}
                    updateResource={props.updateResource}
                    toggle={toggle}
                    data={props.data}
                    teamList={props.teamList}
                  />
                );
              break;
        
            default:
                break;
        }

    }
  } else {
    button = (
      <Button
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );

    switch (label) {
      case "Add teams":
        title = "Add New Team";
        submitForm = (
          <EditTeamForm
              category={props.category}
              createResource={props.createResource}
              toggle={toggle}
          />
      );
      break;

      case "Add players":
        title = "Add New Player";
        submitForm = (
          <EditPlayerForm
              category={props.category}
              createResource={props.createResource}
              toggle={toggle}
          />
      );
      break;

      case "Add coaches":
        title = "Add New Coach";
        submitForm = (
          <EditCoachForm
              category={props.category}
              createResource={props.createResource}
              toggle={toggle}
          />
      );
      break;

      default:
        break;
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