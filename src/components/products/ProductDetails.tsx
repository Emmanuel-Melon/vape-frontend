import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { List, CheckCircle, XCircle, Shield, Wrench, BrainCircuit } from 'lucide-react';

// Define the shape of the product data this component needs
interface ProductDetailsData {
  features: string[];
  pros: string[];
  cons: string[];
  warranty: string;
  maintenanceLevel: 'low' | 'medium' | 'high';
  learningCurve: 'easy' | 'moderate' | 'steep';
}

interface ProductDetailsProps {
  product: ProductDetailsData;
}

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      active
        ? 'bg-green-500 text-white shadow'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {children}
  </button>
);

const DetailItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <motion.li
    className="flex items-start space-x-3"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex-shrink-0 text-green-500">{icon}</div>
    <span className="text-slate-700">{text}</span>
  </motion.li>
);

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = {
    features: {
      label: 'Features',
      icon: <List size={16} />,
      content: product.features.map((item, i) => <DetailItem key={i} icon={<CheckCircle size={16} />} text={item} />)
    },
    pros: {
      label: 'Pros',
      icon: <CheckCircle size={16} />,
      content: product.pros.map((item, i) => <DetailItem key={i} icon={<CheckCircle size={16} />} text={item} />)
    },
    cons: {
      label: 'Cons',
      icon: <XCircle size={16} />,
      content: product.cons.map((item, i) => <DetailItem key={i} icon={<XCircle size={16} />} text={item} />)
    },
    info: {
      label: 'Info',
      icon: <BrainCircuit size={16} />,
      content: [
        <DetailItem key="warranty" icon={<Shield size={16} />} text={`Warranty: ${product.warranty}`} />,
        <DetailItem key="maintenance" icon={<Wrench size={16} />} text={`Maintenance: ${product.maintenanceLevel}`} />,
        <DetailItem key="learning" icon={<BrainCircuit size={16} />} text={`Learning Curve: ${product.learningCurve}`} />
      ]
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
      <div className="flex space-x-2 border-b border-slate-200 pb-2 mb-4">
        {Object.entries(tabs).map(([key, { label }]) => (
          <TabButton key={key} active={activeTab === key} onClick={() => setActiveTab(key)}>
            {label}
          </TabButton>
        ))}
      </div>
      <ul className="space-y-2">
        {tabs[activeTab as keyof typeof tabs].content}
      </ul>
    </div>
  );
};
