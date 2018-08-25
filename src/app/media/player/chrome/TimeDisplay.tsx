import { IPlayerApi, DurationChangeEvent, TimeUpdateEvent } from "../IPlayerApi";
import { h, Component } from "preact";
import { EventHandler } from "../../../libs/events/EventHandler";
import { parseAndFormatTime } from "../../../utils/time";

export interface ITimeDisplayProps {
  api: IPlayerApi
}

export interface ITimeDisplayState {
  currentTime: string;
  durationTime: string;
}

export class TimeDisplay extends Component<ITimeDisplayProps, ITimeDisplayState> {
  private _handler: EventHandler = new EventHandler(this);

  private _currentTime: number = NaN;
  private _duration: number = NaN;

  constructor() {
    super();

    this.state = {
      currentTime: '--:--',
      durationTime: '--:--'
    };
  }

  private _onTimeUpdate(e: TimeUpdateEvent) {
    this._currentTime = e.time;
    this._updateState();
  }
  
  private _onDurationChange(e: DurationChangeEvent) {
    this._duration = e.duration;
    this._updateState();
  }

  private _updateState() {
    const currentTime = this._currentTime;
    const duration = this._duration;

    const newState: ITimeDisplayState = {
      currentTime: '--:--',
      durationTime: '--:--'
    };

    if (!isNaN(currentTime)) {
      newState.currentTime = parseAndFormatTime(currentTime);
    }
    if (!isNaN(duration)) {
      newState.durationTime = parseAndFormatTime(duration);
    }

    this.setState(newState);
  }

  componentDidMount() {
    this._handler
      .listen(this.props.api, 'timeupdate', this._onTimeUpdate, false)
      .listen(this.props.api, 'durationchange', this._onDurationChange, false);
  }

  componentWillUnmount() {
    this._handler.removeAll();
  }

  render({}: ITimeDisplayProps, { currentTime, durationTime }: ITimeDisplayState): JSX.Element {
    return (
      <div class="chrome-time-display">
        <span class="chrome-time-current">{ currentTime }</span>
        <span class="chrome-time-separator"> / </span>
        <span class="chrome-time-duration">{ durationTime }</span>
      </div>
    );
  }
}