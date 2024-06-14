import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface Props {
    options: any;
    selectedVal: any;
    handleChange?: (e: any) => void;
    placeholder?: string
}

const SearchableDropdown: React.FC<Props> = ({
    options,
    selectedVal,
    placeholder,
    handleChange = () => { },
}) => {
    const [query, setQuery] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    const selectOption = (option: any) => {
        setQuery("");
        handleChange(option);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e: MouseEvent) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = (): string => {
        if (query) return query;
        if (selectedVal) return selectedVal?.value;

        return "";
    };

    const filter = (options: any) => {
        return options?.filter(
            (option: any) =>
                option?.value?.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    return (
        <div className="dropdown relative text-gray-700">
            <div className="flex">
                <input
                    ref={inputRef}
                    type="text"
                    value={getDisplayValue()}
                    placeholder={placeholder}
                    name="searchTerm"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleChange(null);
                    }}
                    onClick={(e: any) => toggle(e)}
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <div className={`absolute right-0 top-1.5`}>{isOpen ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />}</div>
            </div>

            <div className={`h-auto max-h-64 overflow-y-auto text-neutral-700 text-base w-full absolute z-10 font-sans transition-all placeholder-shown:border-blue-gray-200 bg-white border border-gray-300 rounded ${isOpen ? "" : "hidden"}`}>
                {filter(options)?.map((option: any, index: number) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`text-neutral-700 px-2 py-0.5 cursor-pointer ${option?.lable === selectedVal?.lable ? "bg-neutral-200 text-neutral-800" : ""
                                }`}
                            key={index}
                        >
                            {option?.value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchableDropdown;
