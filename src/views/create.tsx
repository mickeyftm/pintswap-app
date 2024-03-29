import { Transition } from '@headlessui/react';
import { Button, Card, CopyClipboard, Input, Dropdown, ProgressIndicator } from '../components';
import { useTrade } from '../hooks/trade';
import { BASE_URL } from '../utils/common';

export const CreateView = () => {
    const { broadcastTrade, loading, trade, order, updateTrade, steps } = useTrade();
    return (
        <div className="flex flex-col gap-6">
            <Card className="self-center" header="Create Trade">
                <div className="grid grid-cols-1 gap-6 lg:gap-y-2 items-start">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 items-start">
                        <Dropdown 
                            title="In Details"
                            placeholder="Please select a token..."
                            state={trade.givesToken}
                            setState={updateTrade}
                            type="givesToken"
                            search
                            disabled={!!order.orderHash}
                            customInput
                        />
                        <Input
                            placeholder="Amount to Trade"
                            value={trade.givesAmount}
                            onChange={({ currentTarget }) =>
                                updateTrade('givesAmount', currentTarget.value)
                            }
                            type="number"
                            token={trade.givesToken || true}
                            maxClick={updateTrade}
                            disabled={!!order.orderHash}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 items-start">
                        <Dropdown 
                            title="Out Details"
                            placeholder="Please select a token..."
                            state={trade.getsToken}
                            setState={updateTrade}
                            type="getsToken"
                            search
                            disabled={!!order.orderHash}
                            customInput
                        />
                        <Input
                            placeholder="Amount to Receive"
                            value={trade.getsAmount}
                            onChange={({ currentTarget }) =>
                                updateTrade('getsAmount', currentTarget.value.toUpperCase())
                            }
                            type="number"
                            token={trade.getsToken || true}
                            maxClick={updateTrade}
                            disabled={!!order.orderHash}
                        />
                    </div>
                </div>
                <Button
                    className="mt-6 w-full"
                    loadingText="Broadcasting"
                    loading={loading}
                    onClick={broadcastTrade}
                    disabled={
                        !trade.givesToken || !trade.givesAmount || !trade.getsToken || !trade.getsAmount || !!order.orderHash
                    }
                >
                    Broadcast Trade
                </Button>
            </Card>
            
            <div className="mx-auto">
                <ProgressIndicator steps={steps} />
            </div>

            <Transition
                show={!!order.orderHash && !!order.multiAddr}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex flex-col justify-center items-center text-center"
            >
                <p className="text-sm">Trade Link:</p>
                <CopyClipboard value={`${BASE_URL}/#/${order.multiAddr}/${order.orderHash}`} icon lg isTruncated />
            </Transition>
        </div>
    );
};
