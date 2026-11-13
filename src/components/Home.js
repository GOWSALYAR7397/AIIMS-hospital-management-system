import React, { useState, useEffect } from "react";
import { Carousel, Container, Card } from "react-bootstrap";
import axios from "axios";

function Home() {

  const [doctors, setDoctors] = useState([]);

  // Existing Doctor Images
  const doctorImages = [
    "https://images.unsplash.com/photo-1637059824899-a441006a6875?w=600&auto=format&fit=crop&q=60",

    "https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?w=600&auto=format&fit=crop&q=60",

    "https://media.istockphoto.com/id/1742056601/photo/photo-of-doctor-lady-smile-looking-at-camera-wear-stethoscope-white-uniform-isolate-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=6tSsfAtvqv0ILvha9EbjDhlHA9LZ79qfdUZUgtYzpRA=",

    "https://plus.unsplash.com/premium_photo-1661580632282-c56b1bfc0489?w=600&auto=format&fit=crop&q=60",

    "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=600&auto=format&fit=crop&q=60"
  ];

  // Fetch Doctors from MongoDB
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        const doctorData = Array.isArray(response.data)
          ? response.data
          : response.data.doctors || [];

        setDoctors(doctorData);

      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>

      {/* Carousel */}
      <Carousel>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://plus.unsplash.com/premium_photo-1661766708050-a164431ffdf5?w=600&auto=format&fit=crop&q=60"
            alt="First slide"
            style={{ height: "600px", objectFit: "cover" }}
          />

          <Carousel.Caption>
            <h3>Welcome to AIIMS Hospital</h3>
            <p>
              Best healthcare services with expert doctors and modern facilities.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1282860.jpg"
            alt="Second slide"
            style={{ height: "600px", objectFit: "cover" }}
          />

          <Carousel.Caption>
            <h3>24x7 Emergency</h3>
            <p>Always ready to serve you in critical times.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1312706413/photo/modern-hospital-building.jpg?s=1024x1024&w=is&k=20&c=PmaJ_oxBGdRw0c8g_-KAb2hZVzWEK5Yx83fe2plqLL4="
            alt="Third slide"
            style={{ height: "600px", objectFit: "cover" }}
          />

          <Carousel.Caption>
            <h3>Specialized Departments</h3>
            <p>
              Cardiology, Neurology, Pediatrics, Orthopedics and more.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>


      {/* About Section */}
      <Container className="mt-5 text-center">

        <h2>About AIIMS Hospital</h2>

        <p>
          We provide world-class healthcare with advanced technology and dedicated staff.
          Book appointments, check blood bank availability, ambulance services, and more.
        </p>


        {/* Vertical Hospital Gallery */}
        <div style={{ marginTop: "30px" }}>

          {[
            {
              title: "Main Entrance",
              img: "https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?w=600&auto=format&fit=crop&q=60"
            },
            {
              title: "Emergency Department",
              img: "https://plus.unsplash.com/premium_photo-1681843129112-f7d11a2f17e3?w=600&auto=format&fit=crop&q=60"
            },
            {
              title: "Ambulance Service",
              img: "https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?w=600&auto=format&fit=crop&q=60"
            },
            {
              title: "ICU & OT",
              img: "https://media.istockphoto.com/id/1419003142/photo/nurse-with-male-doctor-examining-of-patient-lying-on-icu-bed-at-hospital.webp?a=1&b=1&s=612x612&w=0&k=20&c=eBFyIapK8fGf97qIJNYLR1C7By9PinPmRNGSLMxxmpY="
            },
            {
              title: "Patient Rooms",
              img: "https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?w=600&auto=format&fit=crop&q=60"
            }
          ].map((hospital, idx) => (

            <Card key={idx} style={{ marginBottom: "20px" }}>

              <Card.Img
                src={hospital.img}
                alt={hospital.title}
              />

              <Card.Body>
                <Card.Title>{hospital.title}</Card.Title>
              </Card.Body>

            </Card>

          ))}

        </div>


        {/* Available Doctors Section */}
        <h2 className="mt-5">Available Doctors</h2>

        <p style={{ color: "#555" }}>
          Meet our experienced and dedicated doctors.
        </p>


        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px 0",
            flexWrap: "nowrap"
          }}
        >

          {doctors.map((doc, idx) => (

            <Card
              key={doc._id || idx}
              style={{
                minWidth: "200px",
                flex: "0 0 auto",
                textAlign: "center",
                borderRadius: "10px"
              }}
            >

              <Card.Img
                variant="top"
                src={doctorImages[idx % doctorImages.length]}
                alt={doc.name}
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  margin: "15px auto",
                  objectFit: "cover"
                }}
              />

              <Card.Body>

                <Card.Title style={{ fontSize: "1rem" }}>
                  Dr. {doc.name}
                </Card.Title>

                <Card.Text
                  style={{
                    fontSize: "0.9rem",
                    color: "#555"
                  }}
                >
                  {doc.specialization || "Specialization Not Specified"}
                </Card.Text>

              </Card.Body>

            </Card>

          ))}

        </div>

      </Container>

    </div>
  );
}

export default Home;