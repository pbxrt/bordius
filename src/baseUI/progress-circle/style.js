import styled from'styled-components';
import style from '../../assets/global-style';

export const CircleWrapper = styled.div`
    position: relative;
    height: 100%;
    > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        circle {
            stroke-width: 8px;
            transform-origin: center;
            &.progress-background {
                transform: scale(0.9);
                stroke: ${style['theme-color-shadow']};
            }
            &.progress-bar {
                transform: scale(0.9) rotate(-90deg);
                stroke: ${style['theme-color']};
            }
        }
    }
`;