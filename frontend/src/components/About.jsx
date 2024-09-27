import React from 'react'
import { layout } from '../style'
import { Cash, Protect, Graph } from '../assets'

const features = [
  {
    id: "feature-1",
    icon: Cash,
    title: "Effortless Transfers",
    content:
      "Send and receive funds across borders with ease, making international payments as simple as a click.",
  },
  {
    id: "feature-2",
    icon: Protect,
    title: "Secure Transactions",
    content:
      "Your data and payments are protected with industry-leading encryption, ensuring every transaction is safe and secure.",
  },
  {
    id: "feature-3",
    icon: Graph,
    title: "Real-Time Monitoring",
    content:
      "Track your international payments in  with complete transparency.",
  },
];

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const About = () => {
  return (
    <section id='features' className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className='font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full'> Your World, <br className='sm:block hidden'/>Connected by Payments.</h2>

        <p className={'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5'}> Whether you're managing business transfers or personal payments, we ensure that your transactions are processed efficiently, with full transparency and security, every step of the way.</p>

      </div>

      <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
    </section>
  )
}

export default About