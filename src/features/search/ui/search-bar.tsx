'use client'

import { debounce } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoFileTraySharp } from 'react-icons/io5'
import { LiaTimesSolid } from 'react-icons/lia'
import { twMerge } from 'tailwind-merge'

const SearchBar = () => {
  const [value, setValue] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  const onSearch = useCallback(
    (searchTerm: string) => {
      router.push(`/search/${searchTerm}`)
    },
    [router.push],
  )

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        onSearch(searchTerm)
      }, 500),
    [onSearch],
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setValue(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleClick = () => {
    if (!pathname.startsWith('/search')) router.push('/search')
  }

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="flex h-10 min-w-[500px] items-center justify-between rounded-full bg-gray-500 px-3 text-gray-200"
    >
      <FiSearch size="1.5rem" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="What do you want to play?"
        className={twMerge(
          'm-2 mr-2.5 flex-1 bg-transparent text-gray-0 placeholder-gray-200 outline-none',
          value ? '' : 'border-r border-gray-200',
        )}
      />
      {value ? (
        <button onClick={() => setValue('')} aria-label="erase">
          <LiaTimesSolid size="1.5rem" />
        </button>
      ) : (
        <IoFileTraySharp size="1.5rem" />
      )}
    </div>
  )
}

export { SearchBar }
