'use client'

import { Tooltip } from '@/components/tooltip'

const CreatePlaylist = () => {
  return (
    <div>
      <h2>Create your first playlist</h2>
      <p>It&apos;s easy, we&apos;ll help you</p>
      <div className="flex flex-col">
        <Tooltip label="Create">
          <button type="button" className="bg-gray-0 text-gray-900">
            Create Playlist
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default CreatePlaylist
