"use client";

import { useEffect, useRef, useState } from "react";

const SHAPES_SVG = `<circle cx="211.153" cy="672.103" r="6.5083" transform="rotate(-180 211.153 672.103)" fill="#8E7A45"></circle>
<circle cx="593.72" cy="722.818" r="6.5083" transform="rotate(-180 593.72 722.818)" fill="#8E7A45"></circle>
<circle cx="374.323" cy="158.338" r="6.5083" transform="rotate(-180 374.323 158.338)" fill="#8E7A45"></circle>
<circle cx="391.963" cy="145.108" r="6.5083" transform="rotate(-180 391.963 145.108)" fill="#8E7A45"></circle>
<circle cx="415.116" cy="149.518" r="6.5083" transform="rotate(-180 415.116 149.518)" fill="#8E7A45"></circle>
<circle cx="421.73" cy="172.671" r="6.5083" transform="rotate(-180 421.73 172.671)" fill="#8E7A45"></circle>
<circle cx="354.479" cy="172.671" r="6.5083" transform="rotate(-180 354.479 172.671)" fill="#8E7A45"></circle>
<circle cx="1247.5" cy="761.406" r="6.5083" transform="rotate(-180 1247.5 761.406)" fill="#8E7A45"></circle>
<circle cx="1281.68" cy="346.866" r="6.5083" transform="rotate(-180 1281.68 346.866)" fill="#8E7A45"></circle>
<circle cx="1453.67" cy="394.273" r="6.5083" transform="rotate(-180 1453.67 394.273)" fill="#8E7A45"></circle>
<circle cx="1464.7" cy="377.736" r="6.5083" transform="rotate(-180 1464.7 377.736)" fill="#8E7A45"></circle>
<circle cx="1364.37" cy="384.351" r="6.5083" transform="rotate(-180 1364.37 384.351)" fill="#8E7A45"></circle>
<circle cx="1421.7" cy="365.608" r="6.5083" transform="rotate(-180 1421.7 365.608)" fill="#8E7A45"></circle>
<circle cx="1391.93" cy="377.736" r="6.5083" transform="rotate(-180 1391.93 377.736)" fill="#8E7A45"></circle>
<circle cx="1440.44" cy="378.838" r="6.5083" transform="rotate(-180 1440.44 378.838)" fill="#8E7A45"></circle>
<circle cx="1442.65" cy="408.606" r="6.5083" transform="rotate(-180 1442.65 408.606)" fill="#8E7A45"></circle>
<circle cx="1377.6" cy="364.506" r="6.5083" transform="rotate(-180 1377.6 364.506)" fill="#8E7A45"></circle>
<circle cx="1254.12" cy="318.201" r="6.5083" transform="rotate(-180 1254.12 318.201)" fill="#8E7A45"></circle>
<circle cx="1216.63" cy="344.661" r="6.5083" transform="rotate(-180 1216.63 344.661)" fill="#8E7A45"></circle>
<circle cx="1405.16" cy="357.891" r="6.5083" transform="rotate(-180 1405.16 357.891)" fill="#8E7A45"></circle>
<circle cx="1426.11" cy="392.068" r="6.5083" transform="rotate(-180 1426.11 392.068)" fill="#8E7A45"></circle>
<circle cx="1411.78" cy="377.736" r="6.5083" transform="rotate(-180 1411.78 377.736)" fill="#8E7A45"></circle>
<circle cx="1201.66" cy="784.707" r="6.5083" transform="rotate(-180 1201.66 784.707)" fill="#8E7A45"></circle>
<circle cx="1261.84" cy="743.766" r="6.5083" transform="rotate(-180 1261.84 743.766)" fill="#8E7A45"></circle>
<circle cx="1319.17" cy="555.238" r="6.5083" transform="rotate(-180 1319.17 555.238)" fill="#8E7A45"></circle>
<circle cx="1272.86" cy="564.058" r="6.5083" transform="rotate(-180 1272.86 564.058)" fill="#8E7A45"></circle>
<circle cx="1235.38" cy="736.048" r="6.5083" transform="rotate(-180 1235.38 736.048)" fill="#8E7A45"></circle>
<circle cx="1216.85" cy="771.691" r="6.5083" transform="rotate(-180 1216.85 771.691)" fill="#8E7A45"></circle>
<circle cx="1273.96" cy="324.816" r="6.5083" transform="rotate(-180 1273.96 324.816)" fill="#8E7A45"></circle>
<circle cx="1219.94" cy="557.443" r="6.5083" transform="rotate(-180 1219.94 557.443)" fill="#8E7A45"></circle>
<circle cx="1294.91" cy="571.776" r="6.5083" transform="rotate(-180 1294.91 571.776)" fill="#8E7A45"></circle>
<circle cx="1307.04" cy="530.983" r="6.5083" transform="rotate(-180 1307.04 530.983)" fill="#8E7A45"></circle>
<circle cx="1247.5" cy="548.623" r="6.5083" transform="rotate(-180 1247.5 548.623)" fill="#8E7A45"></circle>
<circle cx="1193.48" cy="564.058" r="6.5083" transform="rotate(-180 1193.48 564.058)" fill="#8E7A45"></circle>
<circle cx="1284.99" cy="535.393" r="6.5083" transform="rotate(-180 1284.99 535.393)" fill="#8E7A45"></circle>
<circle cx="1261.84" cy="338.046" r="6.5083" transform="rotate(-180 1261.84 338.046)" fill="#8E7A45"></circle>
<circle cx="587.105" cy="685.333" r="6.5083" transform="rotate(-180 587.105 685.333)" fill="#8E7A45"></circle>
<circle cx="1275.07" cy="368.916" r="6.5083" transform="rotate(-180 1275.07 368.916)" fill="#8E7A45"></circle>
<circle cx="1226.56" cy="361.198" r="6.5083" transform="rotate(-180 1226.56 361.198)" fill="#8E7A45"></circle>
<circle cx="1245.3" cy="375.531" r="6.5083" transform="rotate(-180 1245.3 375.531)" fill="#8E7A45"></circle>
<circle cx="1266.25" cy="384.351" r="6.5083" transform="rotate(-180 1266.25 384.351)" fill="#8E7A45"></circle>
<circle cx="1201.2" cy="384.351" r="6.5083" transform="rotate(-180 1201.2 384.351)" fill="#8E7A45"></circle>
<circle cx="1203.4" cy="360.096" r="6.5083" transform="rotate(-180 1203.4 360.096)" fill="#8E7A45"></circle>
<circle cx="574.979" cy="706.281" r="6.5083" transform="rotate(-180 574.979 706.281)" fill="#8E7A45"></circle>
<circle cx="226.588" cy="686.436" r="6.5083" transform="rotate(-180 226.588 686.436)" fill="#8E7A45"></circle>
<circle cx="619.078" cy="733.843" r="6.5083" transform="rotate(-180 619.078 733.843)" fill="#8E7A45"></circle>
<circle cx="191.309" cy="657.771" r="6.5083" transform="rotate(-180 191.309 657.771)" fill="#8E7A45"></circle>
<circle cx="243.125" cy="702.973" r="6.5083" transform="rotate(-180 243.125 702.973)" fill="#8E7A45"></circle>
<rect x="371.7" y="242.55" width="16.8" height="16.8" transform="rotate(-180 371.7 242.55)" fill="#A0B194"></rect>
<rect x="340.2" y="216.3" width="16.8" height="16.8" transform="rotate(-180 340.2 216.3)" fill="#A0B194"></rect>
<rect x="301.35" y="189" width="16.8" height="16.8" transform="rotate(-180 301.35 189)" fill="#A0B194"></rect>
<rect x="301.35" y="141.75" width="16.8" height="16.8" transform="rotate(-180 301.35 141.75)" fill="#A0B194"></rect>
<rect x="284.55" y="113.4" width="16.8" height="16.8" transform="rotate(-180 284.55 113.4)" fill="#A0B194"></rect>
<rect x="255.15" y="73.5" width="16.8" height="16.8" transform="rotate(-180 255.15 73.5)" fill="#A0B194"></rect>
<rect x="233.1" y="42" width="16.8" height="16.8" transform="rotate(-180 233.1 42)" fill="#A0B194"></rect>
<rect x="388.5" y="276.15" width="16.8" height="16.8" transform="rotate(-180 388.5 276.15)" fill="#A0B194"></rect>
<rect x="835.8" y="260.4" width="19.95" height="19.95" transform="rotate(-180 835.8 260.4)" fill="#A0B194"></rect>
<rect x="855.75" y="220.5" width="19.95" height="19.95" transform="rotate(-180 855.75 220.5)" fill="#A0B194"></rect>
<rect x="1444.8" y="259.35" width="19.95" height="19.95" transform="rotate(-180 1444.8 259.35)" fill="#A0B194"></rect>
<rect x="1436.4" y="221.55" width="19.95" height="19.95" transform="rotate(-180 1436.4 221.55)" fill="#A0B194"></rect>
<rect x="1436.4" y="295.05" width="19.95" height="19.95" transform="rotate(-180 1436.4 295.05)" fill="#A0B194"></rect>
<rect x="1374.45" y="297.15" width="19.95" height="19.95" transform="rotate(-180 1374.45 297.15)" fill="#A0B194"></rect>
<rect x="1308.3" y="395.85" width="19.95" height="19.95" transform="rotate(-180 1308.3 395.85)" fill="#A0B194"></rect>
<rect x="1274.7" y="406.35" width="19.95" height="19.95" transform="rotate(-180 1274.7 406.35)" fill="#A0B194"></rect>
<rect x="672" y="303.45" width="19.95" height="19.95" transform="rotate(-180 672 303.45)" fill="#A0B194"></rect>
<rect x="727.65" y="319.2" width="19.95" height="19.95" transform="rotate(-180 727.65 319.2)" fill="#A0B194"></rect>
<rect x="597.45" y="361.2" width="19.95" height="19.95" transform="rotate(-180 597.45 361.2)" fill="#A0B194"></rect>
<rect x="371.7" y="452.55" width="19.95" height="19.95" transform="rotate(-180 371.7 452.55)" fill="#A0B194"></rect>
<rect x="304.5" y="484.05" width="19.95" height="19.95" transform="rotate(-180 304.5 484.05)" fill="#A0B194"></rect>
<rect x="204.75" y="532.35" width="19.95" height="19.95" transform="rotate(-180 204.75 532.35)" fill="#A0B194"></rect>
<rect x="90.2998" y="564.9" width="19.95" height="19.95" transform="rotate(-180 90.2998 564.9)" fill="#A0B194"></rect>
<rect x="1258.95" y="297.15" width="19.95" height="19.95" transform="rotate(-180 1258.95 297.15)" fill="#A0B194"></rect>
<rect x="1373.4" y="528.15" width="19.95" height="19.95" transform="rotate(-180 1373.4 528.15)" fill="#A0B194"></rect>
<rect x="1328.25" y="538.65" width="19.95" height="19.95" transform="rotate(-180 1328.25 538.65)" fill="#A0B194"></rect>
<rect x="1297.8" y="564.9" width="19.95" height="19.95" transform="rotate(-180 1297.8 564.9)" fill="#A0B194"></rect>
<rect x="1292.55" y="599.55" width="19.95" height="19.95" transform="rotate(-180 1292.55 599.55)" fill="#A0B194"></rect>
<rect x="1282.05" y="637.35" width="19.95" height="19.95" transform="rotate(-180 1282.05 637.35)" fill="#A0B194"></rect>
<rect x="1267.35" y="704.55" width="19.95" height="19.95" transform="rotate(-180 1267.35 704.55)" fill="#A0B194"></rect>
<rect x="1265.25" y="741.3" width="19.95" height="19.95" transform="rotate(-180 1265.25 741.3)" fill="#A0B194"></rect>
<rect x="1292.55" y="774.9" width="19.95" height="19.95" transform="rotate(-180 1292.55 774.9)" fill="#A0B194"></rect>
<rect x="1333.5" y="794.85" width="19.95" height="19.95" transform="rotate(-180 1333.5 794.85)" fill="#A0B194"></rect>
<rect x="1221.15" y="426.3" width="19.95" height="19.95" transform="rotate(-180 1221.15 426.3)" fill="#A0B194"></rect>
<rect x="560.7" y="731.85" width="14.7" height="14.7" transform="rotate(-180 560.7 731.85)" fill="#A0B194"></rect>
<rect x="533.4" y="705.6" width="14.7" height="14.7" transform="rotate(-180 533.4 705.6)" fill="#A0B194"></rect>
<rect x="518.7" y="672" width="14.7" height="14.7" transform="rotate(-180 518.7 672)" fill="#A0B194"></rect>
<rect x="511.35" y="645.75" width="14.7" height="14.7" transform="rotate(-180 511.35 645.75)" fill="#A0B194"></rect>
<rect x="511.35" y="613.2" width="14.7" height="14.7" transform="rotate(-180 511.35 613.2)" fill="#A0B194"></rect>
<rect x="510.3" y="578.55" width="13.65" height="13.65" transform="rotate(-180 510.3 578.55)" fill="#A0B194"></rect>
<rect x="504" y="547.05" width="14.7" height="14.7" transform="rotate(-180 504 547.05)" fill="#A0B194"></rect>
<rect x="490.35" y="498.75" width="14.7" height="14.7" transform="rotate(-180 490.35 498.75)" fill="#A0B194"></rect>
<rect x="1416.45" y="321.3" width="19.95" height="19.95" transform="rotate(-180 1416.45 321.3)" fill="#A0B194"></rect>
<rect x="1405.95" y="294" width="19.95" height="19.95" transform="rotate(-180 1405.95 294)" fill="#A0B194"></rect>
<rect x="836.85" y="187.95" width="21" height="21" transform="rotate(-180 836.85 187.95)" fill="#A0B194"></rect>
<rect x="855.75" y="166.95" width="19.95" height="19.95" transform="rotate(-180 855.75 166.95)" fill="#A0B194"></rect>
<rect x="845.25" y="134.4" width="19.95" height="19.95" transform="rotate(-180 845.25 134.4)" fill="#A0B194"></rect>
<rect x="875.7" y="99.75" width="19.95" height="19.95" transform="rotate(-180 875.7 99.75)" fill="#A0B194"></rect>
<rect x="825.3" y="36.75" width="19.95" height="19.95" transform="rotate(-180 825.3 36.75)" fill="#A0B194"></rect>
<rect x="1136.1" y="366.45" width="31.5" height="31.5" transform="rotate(-180 1136.1 366.45)" fill="#A0B194"></rect>
<rect x="935.55" y="319.2" width="31.5" height="31.5" transform="rotate(-180 935.55 319.2)" fill="#A0B194"></rect>
<rect x="994.35" y="350.7" width="31.5" height="31.5" transform="rotate(-180 994.35 350.7)" fill="#A0B194"></rect>
<rect x="1062.6" y="340.2" width="31.5" height="31.5" transform="rotate(-180 1062.6 340.2)" fill="#A0B194"></rect>
<path d="M446.839 151.2L430.87 182.7L462.807 182.7L446.839 151.2Z" fill="#EBFC72"></path>
<path d="M727.189 168L711.22 199.5L743.158 199.5L727.189 168Z" fill="#EBFC72"></path>
<path d="M707.239 71.4L691.27 102.9L723.207 102.9L707.239 71.4Z" fill="#EBFC72"></path>
<path d="M671.539 121.8L655.57 153.3L687.508 153.3L671.539 121.8Z" fill="#EBFC72"></path>
<path d="M443.689 99.75L427.72 131.25L459.658 131.25L443.689 99.75Z" fill="#EBFC72"></path>
<path d="M857.389 220.5L841.42 189L873.358 189L857.389 220.5Z" fill="#EBFC72"></path>
<path d="M605.389 221.55L589.42 253.05L621.358 253.05L605.389 221.55Z" fill="#EBFC72"></path>
<path d="M632.689 79.8L616.72 111.3L648.658 111.3L632.689 79.8Z" fill="#EBFC72"></path>
<path d="M671.539 4.20001L655.57 35.7L687.508 35.7L671.539 4.20001Z" fill="#EBFC72"></path>
<path d="M586.489 37.8L570.52 69.3L602.457 69.3L586.489 37.8Z" fill="#EBFC72"></path>
<path d="M1322.54 452.55L1306.57 484.05L1338.51 484.05L1322.54 452.55Z" fill="#EBFC72"></path>
<path d="M1279.49 463.05L1263.52 494.55L1295.46 494.55L1279.49 463.05Z" fill="#EBFC72"></path>
<path d="M1129.34 112.35L1113.37 143.85L1145.31 143.85L1129.34 112.35Z" fill="#EBFC72"></path>
<path d="M1215.44 1.60639e-06L1199.47 31.5L1231.41 31.5L1215.44 1.60639e-06Z" fill="#EBFC72"></path>
<path d="M1104.14 173.25L1088.17 204.75L1120.11 204.75L1104.14 173.25Z" fill="#EBFC72"></path>
<path d="M1320.44 309.75L1304.47 341.25L1336.41 341.25L1320.44 309.75Z" fill="#EBFC72"></path>
<path d="M1190.24 320.25L1174.27 351.75L1206.21 351.75L1190.24 320.25Z" fill="#EBFC72"></path>
<path d="M1424.32 47.25L1408.41 78.75L1440.24 78.75L1424.32 47.25Z" fill="#EBFC72"></path>
<path d="M1493.63 221.55L1477.71 253.05L1509.54 253.05L1493.63 221.55Z" fill="#EBFC72"></path>
<path d="M1094.69 585.9L1078.72 554.4L1110.66 554.4L1094.69 585.9Z" fill="#EBFC72"></path>
<path d="M1044.29 659.4L1028.32 627.9L1060.26 627.9L1044.29 659.4Z" fill="#EBFC72"></path>
<path d="M1424.39 687.75L1408.42 656.25L1440.36 656.25L1424.39 687.75Z" fill="#EBFC72"></path>
<path d="M1394.92 638.4L1379.01 606.9L1410.84 606.9L1394.92 638.4Z" fill="#EBFC72"></path>
<path d="M1377.14 678.3L1361.17 646.8L1393.11 646.8L1377.14 678.3Z" fill="#EBFC72"></path>
<path d="M953.989 759.15L938.02 727.65L969.957 727.65L953.989 759.15Z" fill="#EBFC72"></path>
<path d="M981.289 714L965.32 682.5L997.258 682.5L981.289 714Z" fill="#EBFC72"></path>
<path d="M917.239 794.85L901.27 763.35L933.207 763.35L917.239 794.85Z" fill="#EBFC72"></path>
<path d="M204.289 105L188.32 136.5L220.258 136.5L204.289 105Z" fill="#EBFC72"></path>
<path d="M112.939 163.8L96.9702 195.3L128.908 195.3L112.939 163.8Z" fill="#EBFC72"></path>
<path d="M61.4892 84L45.5205 115.5L77.4579 115.5L61.4892 84Z" fill="#EBFC72"></path>
<path d="M215.839 252L199.87 283.5L231.807 283.5L215.839 252Z" fill="#EBFC72"></path>
<path d="M92.9888 366.45L108.957 397.95L77.0202 397.95L92.9888 366.45Z" fill="#EBFC72"></path>
<path d="M33.1391 297.15L17.1704 328.65L49.1078 328.65L33.1391 297.15Z" fill="#EBFC72"></path>
<path d="M18.4389 276.15L2.47025 307.65L34.4076 307.65L18.4389 276.15Z" fill="#EBFC72"></path>
<path d="M336.589 699.3L320.62 667.8L352.557 667.8L336.589 699.3Z" fill="#EBFC72"></path>
<path d="M398.539 621.6L382.57 590.1L414.508 590.1L398.539 621.6Z" fill="#EBFC72"></path>
<path d="M286.189 711.9L270.22 680.4L302.158 680.4L286.189 711.9Z" fill="#EBFC72"></path>
<path d="M398.539 783.3L382.57 751.8L414.508 751.8L398.539 783.3Z" fill="#EBFC72"></path>
<path d="M148.639 407.4L132.67 438.9L164.608 438.9L148.639 407.4Z" fill="#EBFC72"></path>
<path d="M149.689 673.05L133.72 641.55L165.658 641.55L149.689 673.05Z" fill="#EBFC72"></path>
<path d="M130.789 626.85L114.82 595.35L146.758 595.35L130.789 626.85Z" fill="#EBFC72"></path>
<path d="M249.439 785.4L233.47 753.9L265.408 753.9L249.439 785.4Z" fill="#EBFC72"></path>`;

const STAGE_WIDTH = 1512;
const STAGE_HEIGHT = 795;
const MIN_SECTION_HEIGHT = 700;
const INFLUENCE_RADIUS = 130;
const EASE = 0.18;

type ShapeState = {
    el: SVGGraphicsElement;
    tag: string;
    cx: number;
    cy: number;
    origTransform: string;
    scale: number;
    tScale: number;
    rot: number;
    tRot: number;
    dx: number;
    dy: number;
    tdx: number;
    tdy: number;
};

type InteractiveMapBackgroundProps = {
    children?: React.ReactNode;
    className?: string;
};

export const InteractiveMapBackground = ({ children, className }: InteractiveMapBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        const cursor = cursorRef.current;
        if (!container || !svg || !cursor) return;

        const computeScale = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            setScale(Math.max(w / STAGE_WIDTH, h / STAGE_HEIGHT));
        };
        computeScale();
        window.addEventListener("resize", computeScale);

        const shapes: ShapeState[] = Array.from(svg.children).map((el) => {
            const tag = el.tagName.toLowerCase();
            let cx = 0;
            let cy = 0;
            if (tag === "circle") {
                cx = +el.getAttribute("cx")!;
                cy = +el.getAttribute("cy")!;
            } else if (tag === "rect") {
                const x = +el.getAttribute("x")!;
                const y = +el.getAttribute("y")!;
                const w = +el.getAttribute("width")!;
                const h = +el.getAttribute("height")!;
                cx = x - w / 2;
                cy = y - h / 2;
            } else if (tag === "path") {
                const nums = (el.getAttribute("d")!.match(/-?[\d.eE+-]+/g) || []).map(Number);
                cx = (nums[0] + nums[2] + nums[4]) / 3;
                cy = (nums[1] + nums[3] + nums[5]) / 3;
            }
            return {
                el: el as SVGGraphicsElement,
                tag,
                cx,
                cy,
                origTransform: el.getAttribute("transform") || "",
                scale: 1,
                tScale: 1,
                rot: 0,
                tRot: 0,
                dx: 0,
                dy: 0,
                tdx: 0,
                tdy: 0,
            };
        });

        const mouse = { x: 0, y: 0, active: false };
        let cursorPos = { x: -100, y: -100 };

        const handleMove = (e: MouseEvent) => {
            cursorPos = { x: e.clientX, y: e.clientY };
            const rect = svg.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / (rect.width / STAGE_WIDTH);
            mouse.y = (e.clientY - rect.top) / (rect.height / STAGE_HEIGHT);
            mouse.active = true;
        };
        const handleLeave = () => {
            mouse.active = false;
            cursor.style.opacity = "0";
        };
        const handleEnter = () => {
            cursor.style.opacity = "1";
        };

        container.addEventListener("mousemove", handleMove);
        container.addEventListener("mouseleave", handleLeave);
        container.addEventListener("mouseenter", handleEnter);

        let raf = 0;
        const tick = () => {
            shapes.forEach((s) => {
                let influence = 0;
                if (mouse.active) {
                    const dist = Math.hypot(s.cx - mouse.x, s.cy - mouse.y);
                    influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
                }
                s.tScale = 1 + influence * 1.5;
                s.tRot = s.tag === "path" ? influence * 40 : s.tag === "rect" ? influence * 55 : 0;
                const ang = Math.atan2(s.cy - mouse.y, s.cx - mouse.x);
                s.tdx = Math.cos(ang) * influence * 22;
                s.tdy = Math.sin(ang) * influence * 22;
                s.scale += (s.tScale - s.scale) * EASE;
                s.rot += (s.tRot - s.rot) * EASE;
                s.dx += (s.tdx - s.dx) * EASE;
                s.dy += (s.tdy - s.dy) * EASE;
                const cx = s.cx + s.dx;
                const cy = s.cy + s.dy;
                s.el.setAttribute(
                    "transform",
                    `translate(${cx} ${cy}) scale(${s.scale}) rotate(${s.rot}) translate(${-s.cx} ${-s.cy}) ${s.origTransform}`,
                );
            });
            cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("resize", computeScale);
            container.removeEventListener("mousemove", handleMove);
            container.removeEventListener("mouseleave", handleLeave);
            container.removeEventListener("mouseenter", handleEnter);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className={`relative overflow-hidden ${className ?? ""}`}
            style={{ background: "#EDE6D3", cursor: "none", minHeight: MIN_SECTION_HEIGHT }}
        >
            <style>{`@keyframes spinHex { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${STAGE_WIDTH}px`,
                    height: `${STAGE_HEIGHT}px`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: "center center",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/about-map-background.png"
                    alt=""
                    style={{
                        width: `${STAGE_WIDTH}px`,
                        height: `${STAGE_HEIGHT}px`,
                        objectFit: "cover",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                />
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
                    width={STAGE_WIDTH}
                    height={STAGE_HEIGHT}
                    style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
                    dangerouslySetInnerHTML={{ __html: SHAPES_SVG }}
                />
            </div>
            {children}
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                    zIndex: 50,
                    opacity: 0,
                }}
            >
                <svg
                    width={52}
                    height={52}
                    viewBox="0 0 52 52"
                    style={{
                        position: "absolute",
                        left: -26,
                        top: -26,
                        animation: "spinHex 7s linear infinite",
                        transformOrigin: "26px 26px",
                    }}
                >
                    <polygon points="26,4 47,44 5,44" fill="rgba(235,252,114,0.18)" stroke="#EBFC72" strokeWidth={1.6} />
                </svg>
            </div>
        </section>
    );
};
