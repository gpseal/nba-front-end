/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * For displaying existing API collections
 * 
 * updateResource:  Finds resource to update via form
 * deleteResources: removes data from array to be displayed, updates resources array
 * getData: fetches data from API, inputs into resources array
 * displayFields: produces array of column headings for table
 * displayData: displays table data content
 */

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'reactstrap'
import ModalForm from '../modals/Modal'
import Pagination from '../Pagination'
import '../tables/Table.css'

const DataTable = (props) => {
    const BASE_URL = 'https://id607001-sealgp1.herokuapp.com'

    const [resources, setResources] = useState([])

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1) //starting page for pagination
    const [dataPerPage, setDataPerPage] = useState(5) //for pagination

    const createResource = (resource) => {
        setResources([...resources, resource])
    }

    const updateResource = (resource) => {
        const resourceIndex = resources.findIndex(
            (data) => data.id === resource.id
        )
        const newArray = [
            ...resources.slice(0, resourceIndex),
            resource,
            ...resources.slice(resourceIndex + 1),
        ]
        setResources(newArray)
    }

    const deleteResources = (_id) => {
        const updatedItems = resources.filter((team) => team._id !== _id)
        setResources(updatedItems)
    }

    const deleteResource = async (_id) => {
        let confirmDelete = window.confirm(
            `Are you sure you want to delete item: ${_id} ?`
        )
        if (confirmDelete) {
            try {
                const res = axios.delete(
                    `${BASE_URL}/api/v1/${props.category}/${_id}`,
                    {
                        headers: {
                            authorization: `Bearer ${sessionStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                if (res.status === 200) alert('Item deleted successfully')
                deleteResources(_id)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/v1/${props.category}?limit=0`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )

            setResources(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const displayFields = props.fields.map((f) => {
        if (f === 'edit') {
            return ''
        } else {
            return (
                <th>
                    {f.charAt(0).toUpperCase() +
                        f.replace(/[A-Z]/g, ' $&').trim().slice(1)}
                </th>
            )
        }
    })

    const displayData = resources.map((d) => {
        return (
            <tr key={d._id}>
                {props.fields.map((f) => {
                    switch (f) {
                        case 'edit': //shows edit button
                            return (
                                <td>
                                    <ModalForm
                                        buttonLabel="Edit"
                                        data={d}
                                        updateResource={updateResource}
                                        category={props.category}
                                    />
                                    <Button
                                        color="danger"
                                        onClick={() => deleteResource(d._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            )
                            break
                        case 'coach':
                            if (d[f]) {
                                return (
                                    <td>{`${d[f].firstName} ${d[f].lastName}`}</td>
                                )
                            } else return <td>n/a</td>

                            break
                        case 'team':
                            if (d[f]) {
                                return <td>{d[f].name}</td>
                            } else return <td>n/a</td>
                            break
                        default:
                            return <td>{d[f]}</td>
                            break
                    }
                })}
            </tr>
        )
    })

    //Button label for adding data
    const label = `Add ${props.category}`

    //Pagination setting content per page
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = displayData.slice(indexOfFirstData, indexOfLastData)

    //Pagination setting page to display
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <Table>
                <thead>
                    <tr>{displayFields}</tr>
                </thead>
                <tbody>{currentData}</tbody>
            </Table>
            <ModalForm
                buttonLabel={label}
                createResource={createResource}
            />
            <Pagination
                dataPerPage={dataPerPage}
                totalData={displayData.length}
                paginate={paginate}
            />
        </>
    )
}

export default DataTable
