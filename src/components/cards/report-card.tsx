import React from 'react'
import Icon from "../../assets/icons";

interface Statistics {
  all: number;
  active: number;
  suspended: number;
  locked: number;
}

interface ReportCardProps {
  statistics: Statistics;
}

const ReportCard = ({ title, icon, value }: any) => {
  return (
    <section className="bg-white rounded-md border border-[#fff]">
      <div className="flex justify-between px-3 py-3">
        <Icon name={icon} />
        <Icon name="arrowForward" />
      </div>
      <p className="font-bold text-[24px] pl-3">{value}</p>
      <span className="text-[14px] font-light pl-3">{title}</span>
    </section>
  )
}

export const ReportCards = ({statistics}: ReportCardProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <ReportCard
        title="All reports"
        icon="personIcon"
        value={statistics?.all ? statistics?.all : 0}
      />
      <ReportCard
        title="Approved reports"
        icon="personIcon"
        value={statistics?.active ? statistics?.active : 0}
      />
      <ReportCard
        title="pending reports"
        icon="personIcon"
        value={statistics?.suspended ? statistics?.suspended : 0}
      />
      <ReportCard
        title="Cancelled requests"
        icon="personIcon"
        value={statistics?.locked ? statistics?.locked : 0}
      />
    </div>
  )
}