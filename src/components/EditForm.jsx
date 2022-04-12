import React from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap';

export const EditForm = () => {
  return (
    <div>
        <Form id="data-form">
               <Form.Group id="location">
                    <Form.Label></Form.Label>

                    <Form.Control type='text' placeholder='Location' required />
                </Form.Group>
                </Form>
    </div>
  )
}
