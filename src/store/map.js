import { atom, useAtomValue, useSetAtom } from 'jotai';

const initialState = {
    lat: null,
    lng: null,
    range: null,
    scopes: '',
    lbseToken: 'FB378D11-FA61-4DBC-8EAB-C3F22C9053CA',
    pois: []
};

const stateAtom = atom(initialState);

const useMapStore = () => {
    const setData = useSetAtom(stateAtom);
    const setMapState = (data) => {
        setData((prevState) => ({ ...prevState, ...data }));
    };

    return { ...useAtomValue(stateAtom), setMapState };
};

export default useMapStore;