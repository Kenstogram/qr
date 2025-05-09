type Props = {
  type: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  streamKey: string;
  setStreamKey: (streamKey: string) => void;
};

export const EgressDestination = ({
  type,
  enabled,
  setEnabled,
  streamKey,
  setStreamKey,
}: Props) => {
  return (
    <div className="flex items-center">
        <div className="text-white font-italics ml-1">
          {type}
        </div>
        <div className="flex items-center m-2">
          <input
            type="checkbox"
            checked={enabled}
            className="toggle toggle-sm mr-2"
            onChange={(e) => {
              setEnabled(e.target.checked);
            }}
          />
          <input
            onChange={(e) => {
              setStreamKey(e.target.value);
            }}
            value={streamKey}
            type="password"
            className="input input-sm text-black"
            placeholder="Stream Key"
          />
      </div>
    </div>
  );
};