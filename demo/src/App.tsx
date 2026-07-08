import { useState, useEffect, useRef } from 'react';
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
import {
  localStore,
  sessionStore,
} from 'atomix-fe/storage';
import {
  getQueryParam,
  setQueryParam,
  hasQueryParam,
} from 'atomix-fe/url';
import {
  lazyLoadImage,
  observeIntersection,
} from 'atomix-fe/browser';
import {
  $,
  $$,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  getStyle,
  setStyle,
  show,
  hide,
  isHidden,
  createElement,
  append,
  prepend,
  empty,
  setText,
  getText,
  setData,
  getData,
} from 'atomix-fe/dom';

const emitter = new EventEmitter();

const DEMO_URL = 'https://example.com/path?a=1&b=hello#section';

export default function App() {
  const [inputText, setInputText] = useState('hello world');
  const [numberInput, setNumberInput] = useState(42);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [storageData, setStorageData] = useState<string>('');
  const [storageKeys, setStorageKeys] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setStorageKeys(localStore.keys());
  }, []);

  const handleStorageSet = () => {
    const data = { id: Date.now(), value: storageData };
    localStore.set('demoData', data);
    setStorageKeys(localStore.keys());
  };

  const handleStorageGet = () => {
    const data = localStore.get<{ id: number; value: string }>('demoData');
    if (data) {
      setStorageData(JSON.stringify(data));
    }
  };

  const handleStorageRemove = () => {
    localStore.remove('demoData');
    setStorageKeys(localStore.keys());
    setStorageData('');
  };

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

      {/* Storage 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Storage (本地存储)</h2>
        <StorageDemo onUpdate={() => setStorageKeys(localStore.keys())} />
        <div style={{ marginTop: '1rem' }}>
          <h4>localStorage keys: {storageKeys.length}个</h4>
          <ul style={{ background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px', maxHeight: '100px', overflow: 'auto' }}>
            {storageKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* URL 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>URL (URL 工具)</h2>
        <div style={{ background: '#f5f5f5', padding: '0.5rem 1rem', borderRadius: '4px', marginBottom: '1rem', wordBreak: 'break-all' }}>
          <strong>示例 URL：</strong> {DEMO_URL}
        </div>
        <ul style={{ lineHeight: '2' }}>
          <li>getQueryParam(url, 'a'): {getQueryParam(DEMO_URL, 'a')}</li>
          <li>getQueryParam(url, 'b'): {getQueryParam(DEMO_URL, 'b')}</li>
          <li>getQueryParam(url, 'x'): {String(getQueryParam(DEMO_URL, 'x'))}</li>
          <li>hasQueryParam(url, 'a'): {hasQueryParam(DEMO_URL, 'a') ? 'true' : 'false'}</li>
          <li>hasQueryParam(url, 'x'): {hasQueryParam(DEMO_URL, 'x') ? 'true' : 'false'}</li>
          <li style={{ wordBreak: 'break-all' }}>setQueryParam(url, 'c', 'new'): {setQueryParam(DEMO_URL, 'c', 'new')}</li>
          <li style={{ wordBreak: 'break-all' }}>setQueryParam(url, 'a', '999'): {setQueryParam(DEMO_URL, 'a', '999')}</li>
        </ul>
      </section>

      {/* Browser 模块 - 图片懒加载 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Browser (浏览器工具 - 图片懒加载)</h2>
        <LazyLoadDemo />
      </section>

      {/* Browser 模块 - 元素可见性观察 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Browser (浏览器工具 - 元素可见性观察)</h2>
        <IntersectionDemo />
      </section>

      {/* DOM 模块 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>DOM (DOM 操作)</h2>
        <DomDemo />
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

function StorageDemo({ onUpdate }: { onUpdate: () => void }) {
  const [input, setInput] = useState('');
  const [value, setValue] = useState<string | null>(null);

  const handleSet = () => {
    const data = { id: Date.now(), value: input };
    localStore.set('demoData', data);
    setInput('');
    onUpdate();
  };

  const handleGet = () => {
    const data = localStore.get<{ id: number; value: string }>('demoData');
    setValue(data ? JSON.stringify(data) : 'null');
  };

  const handleRemove = () => {
    localStore.remove('demoData');
    setValue(null);
    onUpdate();
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入存储内容"
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <button onClick={handleSet} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          存储
        </button>
        <button onClick={handleGet} style={{ padding: '0.5rem 1rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          获取
        </button>
        <button onClick={handleRemove} style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          删除
        </button>
      </div>
      {value && (
        <div style={{ background: '#e3f2fd', padding: '0.5rem', borderRadius: '4px' }}>
          <strong>获取的值:</strong> {value}
        </div>
      )}
    </div>
  );
}

function LazyLoadDemo() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const images = [
    { id: 1, color: 'FF6B6B', title: '图片 1' },
    { id: 2, color: '4ECDC4', title: '图片 2' },
    { id: 3, color: '45B7D1', title: '图片 3' },
    { id: 4, color: '96CEB4', title: '图片 4' },
    { id: 5, color: 'FFEAA7', title: '图片 5' },
    { id: 6, color: 'DDA0DD', title: '图片 6' },
  ];

  useEffect(() => {
    if (!imgRef.current) return;

    const imgs = imgRef.current.querySelectorAll('img.lazy-img');
    const cleanup = lazyLoadImage(imgs as NodeListOf<HTMLImageElement>, {
      rootMargin: '50px',
      threshold: 0.1,
      placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5sb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==',
      onLoad: () => setLoadedCount((c) => c + 1),
    });

    return cleanup;
  }, []);

  return (
    <div>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        向下滚动查看懒加载效果，已加载：<strong>{loadedCount}</strong> / {images.length} 张
      </p>
      <div
        ref={imgRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
          maxHeight: '400px',
          overflow: 'auto',
          padding: '1rem',
          background: '#f9f9f9',
          borderRadius: '4px',
        }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ textAlign: 'center' }}>
            <img
              className="lazy-img"
              data-src={`https://via.placeholder.com/300x200/${img.color}/ffffff?text=${img.title}`}
              alt={img.title}
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', background: '#eee' }}
            />
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>{img.title}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
        使用方法：<code>lazyLoadImage('.lazy-img', {'{'} rootMargin: '50px', onLoad: (img) => {'{'}...{'}'} {'}'})</code>
      </p>
    </div>
  );
}

function IntersectionDemo() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0);

  useEffect(() => {
    if (!targetRef.current) return;

    const cleanup = observeIntersection(
      targetRef.current,
      (entry) => {
        setIsVisible(entry.isIntersecting);
        setVisibilityRatio(Math.round(entry.intersectionRatio * 100));
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    return cleanup;
  }, []);

  return (
    <div>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        滚动下方区域，观察元素可见性变化：
      </p>
      <div
        style={{
          height: '200px',
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '1rem',
          background: '#f9f9f9',
        }}
      >
        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          ⬆️ 向上滚动
        </div>
        <div
          ref={targetRef}
          style={{
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            background: isVisible ? '#4CAF50' : '#f44336',
            color: 'white',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            {isVisible ? '👀 元素可见' : '🙈 元素不可见'}
          </h3>
          <p style={{ margin: 0 }}>
            可见比例：{visibilityRatio}%
          </p>
        </div>
        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          ⬇️ 向下滚动
        </div>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
        使用方法：<code>observeIntersection(element, (entry) => {'{'}...{'}'}, {'{'} threshold: [0, 0.5, 1] {'}'})</code>
      </p>
    </div>
  );
}

function DomDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [className, setClassName] = useState('');
  const [styleValue, setStyleValue] = useState('');
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      setData(containerRef.current, 'demo-id', 'dom-demo-001');
    }
  }, []);

  const handleAddClass = () => {
    const el = $('#dom-demo-box');
    if (el && className) {
      addClass(el, className);
      setClassName('');
    }
  };

  const handleRemoveClass = () => {
    const el = $('#dom-demo-box');
    if (el && className) {
      removeClass(el, className);
      setClassName('');
    }
  };

  const handleToggleClass = () => {
    const el = $('#dom-demo-box');
    if (el && className) {
      toggleClass(el, className);
      setClassName('');
    }
  };

  const handleSetStyle = () => {
    const el = $('#dom-demo-box');
    if (el && styleValue) {
      const [prop, val] = styleValue.split(':');
      if (prop && val) {
        setStyle(el, prop.trim(), val.trim());
        setStyleValue('');
      }
    }
  };

  const handleCreateElement = () => {
    const container = $('#dom-container');
    if (container) {
      const btn = createElement('button', {
        className: 'created-btn',
        style: {
          margin: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
        dataset: { count: String($$('.created-btn').length + 1) },
        onclick: () => {
          const count = getData(btn, 'count');
          alert(`按钮 ${count} 被点击！`);
        },
      });
      setText(btn, `按钮 ${$$('.created-btn').length + 1}`);
      append(container, btn);
    }
  };

  const handleAppendText = () => {
    const el = $('#dom-demo-box');
    if (el && textContent) {
      append(el, `<span style="color:#4CAF50; margin-left:0.5rem;">${textContent}</span>`);
      setTextContent('');
    }
  };

  const handleClear = () => {
    const el = $('#dom-demo-box');
    if (el) {
      empty(el);
      setText(el, '点击下方按钮修改此元素');
    }
  };

  const handleShowHide = () => {
    const el = $('#dom-demo-box');
    if (el) {
      if (isHidden(el)) {
        show(el);
      } else {
        hide(el);
      }
    }
  };

  return (
    <div>
      <div
        id="dom-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <label>类名：</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="例如: active"
              style={{ marginLeft: '0.5rem', padding: '0.3rem', width: '120px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button onClick={handleAddClass} style={{ padding: '0.3rem 0.6rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              addClass
            </button>
            <button onClick={handleRemoveClass} style={{ padding: '0.3rem 0.6rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              removeClass
            </button>
            <button onClick={handleToggleClass} style={{ padding: '0.3rem 0.6rem', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              toggleClass
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <label>样式 (prop:value)：</label>
            <input
              type="text"
              value={styleValue}
              onChange={(e) => setStyleValue(e.target.value)}
              placeholder="例如: color:red"
              style={{ marginLeft: '0.5rem', padding: '0.3rem', width: '150px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button onClick={handleSetStyle} style={{ padding: '0.3rem 0.6rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              setStyle
            </button>
            <button onClick={handleShowHide} style={{ padding: '0.3rem 0.6rem', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              show/hide
            </button>
            <button onClick={handleClear} style={{ padding: '0.3rem 0.6rem', background: '#795548', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              empty
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <label>追加文本：</label>
          <input
            type="text"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="输入要追加的文本"
            style={{ marginLeft: '0.5rem', padding: '0.3rem', width: '200px' }}
          />
          <button onClick={handleAppendText} style={{ marginLeft: '0.5rem', padding: '0.3rem 0.6rem', background: '#00BCD4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            append
          </button>
        </div>
        <button onClick={handleCreateElement} style={{ padding: '0.5rem 1rem', background: '#E91E63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}>
          createElement - 创建按钮
        </button>
      </div>

      <div
        id="dom-demo-box"
        ref={containerRef}
        style={{
          padding: '1.5rem',
          border: '2px dashed #ddd',
          borderRadius: '8px',
          minHeight: '100px',
          transition: 'all 0.3s ease',
        }}
      >
        点击下方按钮修改此元素
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#666' }}>当前类名:</span>
        <code id="class-list" style={{ background: '#f5f5f5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          无
        </code>
        <span style={{ fontSize: '0.875rem', color: '#666' }}>数据属性:</span>
        <code id="data-attr" style={{ background: '#f5f5f5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          demo-id: dom-demo-001
        </code>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
        使用方法：<code>import {'{'} $, $$, addClass, removeClass, toggleClass, createElement {'}'} from 'atomix-fe/dom'</code>
      </p>
    </div>
  );
}