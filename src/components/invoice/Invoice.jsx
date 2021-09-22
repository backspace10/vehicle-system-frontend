import React, { useEffect, useState } from "react";
import "./invoice.css";
import logoAqua from "../../assets/vehica_logo_aqua.png";
import logoBlack from "../../assets/vehica_logo_black.png";
import axios from "axios";
import { useSelector } from "react-redux";

const Invoice = () => {
  // const [userDetails, setUserDetails] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [todayDate, setTodayDate] = useState();

  const [modelPrice, setModelPrice] = useState(0);
  const [colorPrice, setColorPrice] = useState(0);
  const [musicPrice, setMusicPrice] = useState(0);

  const [modelTotal, setModelTotal] = useState(0);
  const [colorTotal, setColorTotal] = useState(0);
  const [musicTotal, setMusicTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const modelConfigInfoFromStorage = localStorage.getItem("configInfo")
    ? JSON.parse(localStorage.getItem("configInfo"))
    : {};

  const { modelMusic, modelColor } = modelConfigInfoFromStorage;

  const modelInfoFromStorage = localStorage.getItem("modelInfo")
    ? JSON.parse(localStorage.getItem("modelInfo"))
    : {};

  const { modelId, modelName, modelsQuantity } = modelInfoFromStorage;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchUserDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getUserDetails",
        { username: userInfo },
        config
      );

      // console.log(typeof data);
      // console.log(data);
      let splitData = data.split(",");
      // setUserDetails(splitData);
      // let splitData = data.split(",");
      // console.log(userDetails);
      // console.log(splitData[0]);
      // console.log(typeof splitData);

      // console.log(userDetails[0]);
      // console.log(userDetails[1]);

      setName(splitData[0]);
      setAddress(splitData[1]);
      setContact(splitData[2]);

      // console.log(userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    setTodayDate(today);
  };

  const fetchColorsPrice = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getColorPrice",
        { clrName: modelColor },
        config
      );

      setColorPrice(data);
      let colorTot = data * modelsQuantity;
      setColorTotal(colorTot);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMusicPrice = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getMusicPrice",
        { musicName: modelMusic },
        config
      );

      setMusicPrice(data);
      let musicTot = data * modelsQuantity;
      setMusicTotal(musicTot);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModelPrice = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getMdlPrice",
        { modelId: modelId },
        config
      );
      setModelPrice(data);
      let mdlTotal = data * modelsQuantity;
      setModelTotal(mdlTotal);

      // let subTot = musicTotal + mdlTotal + colorTotal;
      // setSubTotal(subTot);
      // let tot = modelTotal + colorTotal + musicTotal + 500 + 50;
      // setTotal(tot);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMail = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/sendEmail",
        {
          userName: userInfo,
          modelName: modelName,
          modelId: modelId,
          qty: modelsQuantity,
          configColor: modelColor,
          configMusic: modelMusic,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    getTodayDate();
    fetchColorsPrice();
    fetchMusicPrice();
    fetchModelPrice();
    sendMail();
  }, []);

  return (
    <div className="container">
      <div className="my-5 page" size="A4">
        <div className="p-5">
          <section className="top-content bb d-flex justify-content-between">
            <div className="logo">
              <img src={logoAqua} alt="" className="img-fluid" />
              {/* <img src={logoBlack} alt="" className="img-fluid" /> */}
            </div>

            <div className="top-left">
              <div className="graphics-path">
                <p>Invoice</p>
              </div>

              <div className="position-relative">
                <p>
                  Invoice No. <span>xxxx</span>
                </p>
              </div>
            </div>
          </section>

          <section className="store-user mt-5">
            <div className="col-10">
              <div className="row bb pb-3">
                <div className="col-7">
                  <p>Supplier</p>
                  <h2>Vehica</h2>
                  <p className="address">
                    777 Borockton Avenue,
                    <br />
                    Near Sudarshan Tower,
                    <br />
                    Thane,425001
                  </p>
                  <div className="txn mt-2">TXN:xxxxxx</div>
                </div>

                <div className="col-5">
                  <p>Client</p>
                  <h2>{name}</h2>
                  <p className="address">
                    {address}
                    {/* <br />
                    Near Sudarshan Tower,
                    <br />
                    Thane,425001 */}
                  </p>
                  <div className="txn mt-2">Contact:{contact}</div>
                </div>
              </div>
              <div className="row extra-info pt-3">
                <div className="col-7">
                  <p>
                    Payment Method:<span> Cash</span>
                  </p>
                  <p>
                    Order Number:<span> #868</span>
                  </p>
                </div>

                <div className="col-5">
                  <p>
                    Order Date:<span> {todayDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="product-area mt-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <td>Item Description</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="media">
                      <div className="media body">
                        <h5 className="mt=0 title">Model({modelName})</h5>
                      </div>
                    </div>
                  </td>
                  <td>{modelPrice}</td>
                  <td>{modelsQuantity}</td>
                  <td>{modelTotal}</td>
                </tr>
                {modelColor && (
                  <tr>
                    <td>
                      <div className="media">
                        <div className="media body">
                          <h5 className="mt=0 title">Colour({modelColor})</h5>
                        </div>
                      </div>
                    </td>
                    <td>{colorPrice}</td>
                    <td>{modelsQuantity}</td>
                    <td>{colorTotal}</td>
                  </tr>
                )}

                {modelMusic && (
                  <tr>
                    <td>
                      <div className="media">
                        <div className="media body">
                          <h5 className="mt=0 title">
                            Music System({modelMusic})
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td>{musicPrice}</td>
                    <td>{modelsQuantity}</td>
                    <td>{musicTotal}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="balance-info">
            <div className="row">
              <div className="col-8">
                <p className="m-0 font-weight-bold">Note:</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                  minima, ipsum necessitatibus cumque pariatur sunt!
                </p>
              </div>
              <div className="col-4">
                <table className="table border-0 table-hover">
                  <tr>
                    <td>Sub Total:</td>
                    <td>{modelTotal + colorTotal + musicTotal}</td>
                  </tr>
                  <tr>
                    <td>Tax:</td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <td>Deliver</td>
                    <td>50</td>
                  </tr>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>{modelTotal + colorTotal + musicTotal + 500 + 50}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="col-12">
                  <p className="text-center m-0">Director Signature</p>
                </div>
              </div>
            </div>
          </section>

          <footer>
            <hr />
            <p className="m-0 text-center">Thank you for your business.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
