import React from 'react'
import User from './User'

function Users() {
    return (
        <div>
            <h1 className='px-6 py-2 text-white font-semibold bg-slate-800'>Messages</h1>
            <div className='py-2 body my-2 overflow-y-auto' style={{maxHeight: "calc(84vh - 10vh)"}}>

                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />

            </div>
        </div>
    )
}

export default Users