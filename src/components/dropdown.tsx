import { Fragment, MouseEventHandler } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MdChevronRight } from 'react-icons/md'
import { alphaTokenSort, classNames } from '../utils/common'
import { ITokenProps, TOKENS } from '../utils/token-list'

type IDropdownProps = {
  state: any;
  setState: any;
  options?: string[];
  placeholder?: string;
  type: 'tokenIn' | 'tokenOut' | 'string';
  title?: string;
}

export const Dropdown = ({ state, setState, options, placeholder, type, title }: IDropdownProps) => {
  return (
    <div className="flex flex-col gap-1 justify-end">
    {title && <p className="text-sm">{title}</p>}
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center gap-x-1.5 rounded bg-neutral-600 px-3 py-2 hover:bg-neutral-500 transition duration-150">
          <MdChevronRight className="h-5 w-5 rotate-90 " aria-hidden="true" />
          {state ? state : <span className="text-gray-400">{placeholder || 'Select one...'}</span>}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-60 overflow-y-auto">
          {type === 'tokenIn' || type === 'tokenOut' ? TOKENS.sort(alphaTokenSort).map((el: ITokenProps, i) => (
            <Menu.Item key={`dropdown-item-${el.symbol}-${i}`}>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm transition duration-150'
                )}
                onClick={() => setState(type, el.address)}
              >
                {el.symbol}
              </button>
            )}
          </Menu.Item>
          )) : options?.map((el, i) => (
            <Menu.Item key={`dropdown-item-${el}-${i}`}>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm transition duration-150'
                )}
                onClick={() => setState(el)}
              >
                {el}
              </button>
            )}
          </Menu.Item>
          ))}

        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  )
}