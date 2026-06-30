import jsPDF from "jspdf";
import { Order } from "@/types";
import { formatAED, formatDate } from "@/lib/utils";

export function generateInvoicePdf(order: Order) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(11, 31, 42);
  doc.text("Nexa Telecom", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(90, 113, 120);
  doc.text("Tax Invoice", 14, 27);
  doc.text(`Order ID: ${order.id}`, 14, 33);
  doc.text(`Date: ${formatDate(order.createdAt)}`, 14, 38);

  doc.setTextColor(11, 31, 42);
  doc.text("Bill To:", 140, 27);
  doc.setFontSize(9);
  doc.text(order.shippingAddress.fullName, 140, 32);
  doc.text(order.shippingAddress.street, 140, 37);
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.emirate}`, 140, 42);
  doc.text(order.shippingAddress.phone, 140, 47);

  let y = 60;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Item", 14, y);
  doc.text("Qty", 130, y);
  doc.text("Price", 155, y);
  doc.text("Total", 180, y);
  doc.setFont("helvetica", "normal");
  y += 4;
  doc.line(14, y, 196, y);
  y += 8;

  order.items.forEach((item) => {
    doc.text(item.name, 14, y, { maxWidth: 110 });
    doc.text(String(item.quantity), 130, y);
    doc.text(formatAED(item.price), 155, y);
    doc.text(formatAED(item.price * item.quantity), 180, y);
    y += 8;
  });

  y += 4;
  doc.line(14, y, 196, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ${formatAED(order.total)}`, 150, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(90, 113, 120);
  doc.text("Thank you for choosing Nexa Telecom.", 14, 280);

  doc.save(`invoice-${order.id}.pdf`);
}
