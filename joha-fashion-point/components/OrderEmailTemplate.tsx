import React from 'react';
import type { Product } from '../types';

interface OrderData {
  name: string;
  email: string;
  whatsapp: string;
  address:string;
  size: string;
  color: string;
  quantity: number;
  totalPrice: number;
}

interface OrderEmailTemplateProps {
  product: Product;
  order: OrderData;
}

const OrderEmailTemplate: React.FC<OrderEmailTemplateProps> = ({ product, order }) => {
  const formatPrice = (price: number) => `৳${price.toLocaleString('en-US')}`;

  const containerStyle: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f7fafc',
    color: '#1a202c',
    padding: '40px 20px',
    lineHeight: '1.5',
  };
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };
  const h1Style: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '8px',
  };
  const pStyle: React.CSSProperties = {
    color: '#4a5568',
    marginBottom: '24px',
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a202c',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px',
    marginBottom: '16px',
  };
  const productBoxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };
  const productImageStyle: React.CSSProperties = {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '16px',
  };
  const footerStyle: React.CSSProperties = {
    marginTop: '32px',
    textAlign: 'center',
    color: '#718096',
    fontSize: '12px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={h1Style}>Thank You For Your Order!</h1>
        <p style={pStyle}>Hi {order.name}, we've received your order and will process it shortly.</p>

        <h2 style={sectionTitleStyle}>Order Summary</h2>
        
        <div style={productBoxStyle}>
          <img src={product.images[0]} alt={product.name} style={productImageStyle} />
          <div>
            <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{product.name}</p>
            <p style={{ color: '#4a5568', margin: '0' }}>Qty: {order.quantity}</p>
            <p style={{ color: '#4a5568', margin: '0' }}>Size: {order.size}</p>
            <p style={{ color: '#4a5568', margin: '0' }}>Color: {order.color}</p>
          </div>
          <p style={{ fontWeight: 'bold', marginLeft: 'auto' }}>{formatPrice(product.price * order.quantity)}</p>
        </div>

        <div style={{ textAlign: 'right', borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '16px' }}>
          <p style={{ margin: '0', fontSize: '18px' }}>
            <span style={{ fontWeight: 'bold' }}>Total: </span>
            <span style={{ fontWeight: 'bold' }}>{formatPrice(order.totalPrice)}</span>
          </p>
        </div>

        <h2 style={{ ...sectionTitleStyle, marginTop: '32px' }}>Shipping Information</h2>
        <p style={{ margin: '0', fontWeight: 'bold' }}>{order.name}</p>
        <p style={{ color: '#4a5568', margin: '0' }}>{order.address}</p>
        <p style={{ color: '#4a5568', margin: '0' }}>{order.whatsapp}</p>
        <p style={{ color: '#4a5568', margin: '0' }}>{order.email}</p>
      </div>
      <div style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} Joha Fashion Point. All rights reserved.</p>
        <p>123 Fashion Street, Dhaka, Bangladesh</p>
      </div>
    </div>
  );
};

export default OrderEmailTemplate;