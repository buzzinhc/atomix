import { useState, useEffect } from 'react';
import {
  capitalize,
  camelCase,
  kebabCase,
  uuid,
  truncate,
} from 'atomix-fe/string';
import {
  isString,
  isNumber,
  isArray,
  isObject,
  getType,
} from 'atomix-fe/type';
import {
  formatDate,
  timeAgo,
} from 'atomix-fe/date';
import {
  clamp,
  random,
  formatNumber,
} from 'atomix-fe/number';
import {
  EventEmitter,
} from 'atomix-fe/event';

const emitter = new EventEmitter();

export default function App() {
  const [inputText, setInputText] = useState('hello world');
  const [numberInput, setNumberInput] = useState(42);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Atomix-fe 工具库示例
      </h1>

      {/* String 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>String (字符串处理)</h2>
        <div>
          <label>输入文本：</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ marginLeft: '1rem', padding: '0.5rem', width: '250px' }}
          />
        </div>
        <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
          <li>capitalize: {capitalize(inputText)}</li>
          <li>camelCase: {camelCase(inputText)}</li>
          <li>kebabCase: {kebabCase(inputText)}</li>
          <li>truncate: {truncate(inputText, 10)}</li>
          <li>uuid: {uuid()}</li>
        </ul>
      </section>

      {/* Type 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Type (类型判断)</h2>
        <ul style={{ lineHeight: '2' }}>
          <li>isString('hello'): {isString('hello') ? 'true' : 'false'}</li>
          <li>isNumber(123): {isNumber(123) ? 'true' : 'false'}</li>
          <li>isArray([1, 2, 3]): {isArray([1, 2, 3]) ? 'true' : 'false'}</li>
          <li>isObject({}): {isObject({}) ? 'true' : 'false'}</li>
          <li>getType(new Date()): {getType(new Date())}</li>
        </ul>
      </section>

      {/* Date 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Date (日期处理)</h2>
        <ul style={{ lineHeight: '2' }}>
          <li>formatDate: {formatDate(new Date())}</li>
          <li>timeAgo(1分钟前): {timeAgo(Date.now() - 60000)}</li>
          <li>timeAgo(1小时前): {timeAgo(Date.now() - 3600000)}</li>
          <li>当前时间: {new Date(currentTime).toLocaleString()}</li>
        </ul>
      </section>

      {/* Number 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Number (数字处理)</h2>
        <div>
          <label>输入数字：</label>
          <input
            type="number"
            value={numberInput}
            onChange={(e) => setNumberInput(parseInt(e.target.value))}
            style={{ marginLeft: '1rem', padding: '0.5rem' }}
          />
        </div>
        <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
          <li>clamp({numberInput}, 0, 100): {clamp(numberInput, 0, 100)}</li>
          <li>random(1, 100): {random(1, 100)}</li>
          <li>formatNumber(1234567): {formatNumber(1234567)}</li>
        </ul>
      </section>

      {/* Event 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Event (事件总线)</h2>
        <EventDemo emitter={emitter} />
      </section>
    </div>
  );
}

function EventDemo({ emitter }: { emitter: EventEmitter }) {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    const message = `Hello from ${new Date().toLocaleTimeString()}`;
    emitter.emit('message', message);
  };

  useEffect(() => {
    const unsubscribe = emitter.on('message', (data) => {
      setMessages((prev) => [...prev, data as string]);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <button
        onClick={handleSend}
        style={{
          padding: '0.5rem 1rem',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        发送消息
      </button>
      <div style={{ marginTop: '1rem' }}>
        <h4>接收的消息：</h4>
        <ul style={{ maxHeight: '200px', overflow: 'auto', background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}