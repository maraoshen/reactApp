import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';

export default function FormPreview({ userData, imagePreviewUrl }) {
    return (
        <>
        <Row>
            <Col>
                <Image alt='' className='img-thumbnail' src={imagePreviewUrl} hidden={!imagePreviewUrl} thumbnail/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{userData["role"]}</div>
            </Col>
            <Col>
                <div>{userData["firstName"]}</div>
                <br />
                <div>{userData["lastName"]}</div>
            </Col>
        </Row>
        <br />
        <Row>
            <Col>
                <div>{userData["email"]}</div>
            </Col>
            <Col>
                <div>{userData["mobilePhone"]}</div>
            </Col>
        </Row>
        </>
    )
}
