import { ArrowDownSquare } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (newPlaceholder: string) => void;
  children?: React.ReactNode;
}

export function Selector(props: Props) {
  const [isToggled, setToggle] = useState(false);

  const handleOptionClick = (newValue: number) => {
    const formattedValue = `BRT ${newValue}`;
    props.onChange(formattedValue);
    setToggle(false);
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { 
            isSelected: props.value === (child as any).props.children,
            onClick: () => handleOptionClick((child as any).props.children), 
        });
    }
    return child;
    });

  return (
    <div>
      <div className={`flex bg-neutral-800 w-52 justify-between items-center px-1 rounded-t text-white`}>
        <div className='px-1 font-poppins font-semibold text-[0.75rem]'>
          {props.value || props.placeholder}
        </div>
        <ArrowDownSquare
          width={20}
          className={`${isToggled ? 'rotate-90' : 'rotate-0'} transition duration-300 ease-out hover:cursor-pointer`}
          onClick={() => setToggle(!isToggled)}
        />
      </div>
      <div className={`${isToggled ? 'max-h-60 rounded-b' : 'max-h-0'} absolute w-full overflow-hidden transition-max-height duration-300 ease-in-out bg-neutral-800 max-w-52`}>
        {childrenWithProps}
      </div>
    </div>
  );
}