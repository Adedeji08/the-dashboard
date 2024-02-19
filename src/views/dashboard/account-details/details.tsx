import React from 'react'

interface DetailsProps {
    account: {
      id: string;
      merchantBusinessName: string;
      merchantPhoneNumber: string;
      merchantSocialMediaHandle: string;
      merchantEmail: string;
      status: string;
      created_at: string;
      orderId: string;
      buyerName: string;
      buyerPhoneNumber: string;
      buyerEmail: string;
      buyerSocialMediaHandle: string;
      socialMediaPlatform: string;
    } | null;
  }

const Details: React.FC<DetailsProps> = ({ account }) => {
  return (
    <div>Details</div>
  )
}

export default Details