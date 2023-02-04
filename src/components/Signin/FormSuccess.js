import React from 'react'
import Swal from 'sweetalert2'
import {useHistory} from "react-router-dom"


export default function FormSuccess(props) {
    const history = useHistory();
    const loginMessage = Swal.fire({
        icon: 'success',
        title: `Hello ${props.name}`,
        text: 'Form Submitted Successfully.',
        footer: '<a href="/" style="color: #00A3B6">Back to Home Page</a>'
    })

    return (
        <>
            {
                history.push("/")
            }
        </>
    )
}
