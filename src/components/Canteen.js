import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";

// FOOD IMAGES
import idly from "../assets/idly.jpg";
import dosa from "../assets/dosa.jpg";
import milk from "../assets/milk.jpg";
import tea from "../assets/tea.jpg";
import coffee from "../assets/coffee.jpg";
import meals from "../assets/meals.jpg";
import poori from "../assets/poori.jpg";
import chapati from "../assets/chapati.jpg";
import biryani from "../assets/biryani.jpg";
import curdrice from "../assets/curdrice.jpg";
import lemonrice from "../assets/lemonrice.jpg";
import lemonjuice from "../assets/lemonjuice.jpg";

function Canteen() {

  // FOOD ITEMS
  const foods = [
    { name: "Idly", price: 20, image: idly },
    { name: "Dosa", price: 40, image: dosa },
    { name: "Milk", price: 25, image: milk },
    { name: "Tea", price: 15, image: tea },
    { name: "Coffee", price: 20, image: coffee },
    { name: "Meals", price: 80, image: meals },
    { name: "Poori", price: 45, image: poori },
    { name: "Chapati", price: 40, image: chapati },
    { name: "Biryani", price: 150, image: biryani },
    { name: "Curd Rice", price: 50, image: curdrice },
    { name: "Lemon Rice", price: 60, image: lemonrice },
    { name: "Lemon Juice", price: 30, image: lemonjuice }
  ];

  // STATES
  const [cart, setCart] = useState([]);
  const [orderDone, setOrderDone] = useState(false);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  // ADD ITEM
  const add = (food) => {

    setOrderDone(false);

    setCart(prev => {

      const exist = prev.find(i => i.name === food.name);

      if (exist) {

        return prev.map(i =>
          i.name === food.name
            ? {
                ...i,
                qty: i.qty + 1,
                total: (i.qty + 1) * food.price
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...food,
          qty: 1,
          total: food.price
        }
      ];
    });
  };

  // REMOVE ITEM
  const remove = (food) => {

    setCart(prev => {

      const exist = prev.find(i => i.name === food.name);

      if (!exist) return prev;

      if (exist.qty === 1) {
        return prev.filter(i => i.name !== food.name);
      }

      return prev.map(i =>
        i.name === food.name
          ? {
              ...i,
              qty: i.qty - 1,
              total: (i.qty - 1) * food.price
            }
          : i
      );
    });
  };

  // BILL CALCULATIONS
  const subtotal = cart.reduce((a, b) => a + b.total, 0);

  const discount = subtotal * 0.10;

  const gst = (subtotal - discount) * 0.05;

  const total = subtotal - discount + gst;

  // PLACE ORDER - SAVE TO MONGODB
  const placeOrder = async () => {

    if (cart.length === 0) {
      alert("Please add food items to cart");
      return;
    }

    try {

      setLoading(true);

      const orderData = {
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          qty: item.qty,
          total: item.total
        })),
        subtotal,
        discount,
        gst,
        total
      };

      const response = await fetch(
        "http://localhost:5000/api/canteen/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      // SHOW FINAL BILL ONLY AFTER DATABASE SAVE
      setBill({
        items: [...cart],
        subtotal,
        discount,
        gst,
        total
      });

      setOrderDone(true);
      setCart([]);

      alert("Order saved successfully!");

    } catch (error) {

      console.error("Canteen Order Error:", error);

      alert("Order failed: " + error.message);

    } finally {

      setLoading(false);

    }
  };

  // DOWNLOAD PDF
  const downloadPDF = () => {

    if (!bill) return;

    const doc = new jsPDF();

    // HEADER BACKGROUND
    doc.setFillColor(0, 128, 0);

    doc.rect(0, 0, 220, 30, "F");

    // HEADER TEXT
    doc.setTextColor(255, 255, 255);

    doc.setFontSize(22);

    doc.text("HOSPITAL CANTEEN", 45, 20);

    // HOSPITAL DETAILS
    doc.setFontSize(11);

    doc.setTextColor(80);

    doc.text("City Hospital", 20, 40);

    doc.text("Phone: +91 9876543210", 20, 47);

    const date = new Date().toLocaleString();

    doc.text(date, 135, 40);

    // LIGHT BACKGROUND
    doc.setFillColor(245, 255, 245);

    doc.rect(10, 55, 190, 150, "F");

    // TABLE HEADER
    let y = 70;

    doc.setFontSize(13);

    doc.setTextColor(0);

    doc.text("Item", 20, y);

    doc.text("Qty", 100, y);

    doc.text("Price", 130, y);

    doc.text("Total", 165, y);

    y += 5;

    doc.line(20, y, 190, y);

    // ITEMS
    y += 10;

    bill.items.forEach(item => {

      doc.text(item.name, 20, y);

      doc.text(String(item.qty), 102, y);

      doc.text(`Rs ${item.price}`, 130, y);

      doc.text(`Rs ${item.total}`, 165, y);

      y += 10;
    });

    // LINE
    doc.line(20, y, 190, y);

    y += 15;

    // BILL SUMMARY
    doc.setFontSize(12);

    doc.text(`Subtotal: Rs ${bill.subtotal}`, 125, y);

    y += 10;

    doc.text(`Discount: Rs ${bill.discount.toFixed(2)}`, 125, y);

    y += 10;

    doc.text(`GST (5%): Rs ${bill.gst.toFixed(2)}`, 125, y);

    y += 20;

    // TOTAL BOX
    doc.setFillColor(220, 255, 220);

    doc.rect(110, y - 8, 80, 15, "F");

    doc.setFontSize(16);

    doc.setTextColor(0, 150, 0);

    doc.text(
      `TOTAL: Rs ${bill.total.toFixed(2)}`,
      115,
      y + 2
    );

    // FOOTER
    y += 35;

    doc.setFontSize(14);

    doc.setTextColor(100, 100, 100);

    doc.text(
      "*** Thank You! Visit Again ***",
      45,
      y
    );

    // SAVE PDF
    doc.save("Hospital_Canteen_Bill.pdf");
  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Hospital Canteen
      </h2>

      {/* SUCCESS MESSAGE */}
      {orderDone && (

        <div className="p-3 mb-3 bg-success text-white text-center rounded shadow">
          Order Placed Successfully!
        </div>

      )}

      {/* FOOD GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >

        {foods.map((f, i) => (

          <Card
            key={i}
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}
          >

            <Card.Img
              src={f.image}
              style={{
                height: "200px",
                objectFit: "cover"
              }}
            />

            <Card.Body className="text-center">

              <h4>{f.name}</h4>

              <h5 className="text-success">
                Rs {f.price}
              </h5>

              <div className="mt-3">

                <Button
                  variant="success"
                  onClick={() => add(f)}
                >
                  +
                </Button>

                <Button
                  className="ms-2"
                  variant="danger"
                  onClick={() => remove(f)}
                >
                  -
                </Button>

              </div>

            </Card.Body>

          </Card>

        ))}

      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-4 p-4 border rounded shadow">

        <h3>Order Summary</h3>

        {cart.length === 0 && (
          <p>No items selected</p>
        )}

        {cart.map((c, i) => (

          <div
            key={i}
            className="d-flex justify-content-between border-bottom py-2"
          >

            <span>
              {c.name} x {c.qty}
            </span>

            <b>Rs {c.total}</b>

          </div>

        ))}

      </div>

      {/* BILL SUMMARY */}
      <div className="mt-4 p-4 bg-light rounded shadow">

        <h3>Bill Summary</h3>

        <p>Subtotal: Rs {subtotal}</p>

        <p>
          Discount (10%): Rs {discount.toFixed(2)}
        </p>

        <p>
          GST (5%): Rs {gst.toFixed(2)}
        </p>

        <hr />

        <h2 className="text-success">
          Total: Rs {total.toFixed(2)}
        </h2>

        <Button
          className="w-100 mt-3"
          variant="success"
          onClick={placeOrder}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Saving Order..." : "Place Order"}
        </Button>

      </div>

      {/* FINAL BILL */}
      {bill && (

        <div className="mt-4 p-4 border rounded bg-white shadow">

          <h2>Final Bill</h2>

          {bill.items.map((i, idx) => (

            <div
              key={idx}
              className="d-flex justify-content-between border-bottom py-2"
            >

              <span>
                {i.name} x {i.qty}
              </span>

              <b>Rs {i.total}</b>

            </div>

          ))}

          <hr />

          <p>Subtotal: Rs {bill.subtotal}</p>

          <p>
            Discount: Rs {bill.discount.toFixed(2)}
          </p>

          <p>
            GST: Rs {bill.gst.toFixed(2)}
          </p>

          <h3 className="text-success">
            Total Paid: Rs {bill.total.toFixed(2)}
          </h3>

          <Button
            className="mt-3"
            variant="primary"
            onClick={downloadPDF}
          >
            Download PDF
          </Button>

        </div>

      )}

    </div>
  );
}

export default Canteen;