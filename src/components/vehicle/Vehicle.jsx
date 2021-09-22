import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Vehicle({ vehicle }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/vehicle/${vehicle.id}`}>
        <Card.Img src="" />
      </Link>

      <Card.Body>
        <Link to={`/vehicle/${vehicle.id}`}>
          <Card.Title as="div">
            <strong>{vehicle.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">${vehicle.model}</Card.Text>

        <Card.Text as="h3">${vehicle.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Vehicle;
