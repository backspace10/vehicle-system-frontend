import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import Loader from "../components/loader/Loader";
import Message from "../components/message/Message";

function VehicleScreen({ match, history }) {
  //   const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   const dispatch = useDispatch();

  //   const productDetails = useSelector((state) => state.productDetails);
  //   const { loading, error, product } = productDetails;

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  //   useEffect(() => {
  //     if (successProductReview) {
  //       setRating(0);
  //       setComment("");
  //       dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  //     }

  //     dispatch(listProductDetails(match.params.id));
  //   }, [dispatch, match, successProductReview]);

  //   const addToCartHandler = () => {
  //     history.push(`/cart/${match.params.id}?qty=${qty}`);
  //   };

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(
  //       createProductReview(match.params.id, {
  //         rating,
  //         comment,
  //       })
  //     );
  //   };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              {/* <Image src={car} alt="car" fluid /> */}
              <img
                src={require("../assets/1.jpg")}
                alt="ayx"
                width="200px"
                height="200px"
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Honda</h3>
                </ListGroup.Item>

                <ListGroup.Item>Price: $1200</ListGroup.Item>

                <ListGroup.Item>Description: xyz</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card></Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default VehicleScreen;
