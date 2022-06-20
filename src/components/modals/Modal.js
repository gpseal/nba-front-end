/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * Displays forms to edit existing records or add new records to collections
 *
 */

import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import EditTeamForm from '../forms/EditTeamForm'
import EditPlayerForm from '../forms/EditPlayerForm'
import EditCoachForm from '../forms/EditCoachForm'
import './ModalCSS.css'

const ModalForm = (props) => {
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const closeBtn = (
        <Button className="close" onClick={toggle}>
            &times;
        </Button>
    )

    const label = props.buttonLabel

    let button = ''
    let title = ''
    let submitForm = ''

    if (label === 'Edit') { //opens form to edit existing data
        button = (
            <Button
                color="secondary"
                onClick={toggle}
                style={{ float: 'left', marginRight: '10px' }}
            >
                {label}
            </Button>
        )

        if (props.data) {
            switch (props.category) {
                case 'teams':
                    submitForm = (
                        <EditTeamForm
                            label={label}
                            category={props.category}
                            createResource={props.createResource}
                            updateResource={props.updateResource}
                            toggle={toggle}
                            data={props.data}
                        />
                    )
                    break

                case 'players':
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
                    )
                    break

                case 'coaches':
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
                    )
                    break

                default:
                    break
            }
        }
    } else { //opens form to add new data
        button = (
            <Button
                onClick={toggle}
                style={{ float: 'left', marginRight: '10px' }}
            >
                {label}
            </Button>
        )

        switch (label) {
            case 'Add teams':
                title = 'Add New Team'
                submitForm = (
                    <EditTeamForm
                        category={props.category}
                        createResource={props.createResource}
                        toggle={toggle}
                    />
                )
                break

            case 'Add players':
                title = 'Add New Player'
                submitForm = (
                    <EditPlayerForm
                        category={props.category}
                        createResource={props.createResource}
                        toggle={toggle}
                    />
                )
                break

            case 'Add coaches':
                title = 'Add New Coach'
                submitForm = (
                    <EditCoachForm
                        category={props.category}
                        createResource={props.createResource}
                        toggle={toggle}
                    />
                )
                break

            default:
                break
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
    )
}

export default ModalForm
