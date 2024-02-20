import React from 'react'
import AccountCard from '../../components/cards/account-card'

const AccountCards = ({stat}: any) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <AccountCard
        title="Signed up accounts"
        icon="personIcon"
        value={stat?.all ? stat?.all : 0}
      />
      <AccountCard
        title="Active accounts"
        icon="personIcon"
        value={stat?.active ? stat?.active : 0}
      />
      <AccountCard
        title="Suspended accounts"
        icon="personIcon"
        value={stat?.suspended ? stat?.suspended : 0}
      />
      <AccountCard
        title="Locked accounts"
        icon="personIcon"
        value={stat?.locked ? stat?.locked : 0}
      />
    </div>
  )
}

export default AccountCards