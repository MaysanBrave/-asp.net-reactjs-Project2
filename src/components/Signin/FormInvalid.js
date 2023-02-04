import React from 'react'
import Swal from 'sweetalert2'



export default function FormInvalid(props) {

    const loginMessage = Swal.fire({
        icon: 'danger',
        title: `Sorry ${props.name}`,
        text: 'Form Submitted Successfully.',
        footer: '<a href="/" style="color: #00A3B6">Back to Home Page</a>'
    })

    return (
        <div >
        </div>
    )
}
