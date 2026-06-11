## RAID

> [!NOTE]
>
> **廉价冗余磁盘阵列（Redundant arrays of inexpensive disks）：**把多个相对便宜的硬盘组合起来，成为一个硬盘阵列组，使性能达到甚至超过一个价格昂贵、容量巨大的硬盘
>
> + 利用冗余技术提高可靠性
> + 利用并行提高性能
>
> 优点：
>
> + 成本低、功耗小、传输速率高
> + 可提供容错功能

**问题：**磁盘阵列包含的磁盘越多，至少有一块磁盘发生故障的概率越高，因此需要通过镜像或校验信息提供冗余和容错能力。

数据冗余的功能是在用户数据一旦发生损坏后，利用冗余信息可以使损失数据得以恢复，从而保障了用户数据的安全性。

**数据分段：**把一个文件的数据分成多个条带写道多个硬盘，每个条带的大小可以按需调整

![image-20260610215246997](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610215246997.png)

---

### RAID分级

+ 主流分级（七个）：0，1，...，6
+ 组合级别：如RAID0+1

#### RAID0

并行存取到多个硬盘，但没有数据冗余

![image-20260610220650287](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610220650287.png)

#### RAID1

镜像存储，同样的数据在成对的独立磁盘上，互为备份

+ 原始繁忙时，可从镜像读取，因此可以提高读取性能
+ 磁盘失效时，切换到镜像磁盘上

单位成本最高，但提供了很高的数据安全性和可用性

![image-20260610220717420](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610220717420.png)

#### RAID 0+1 && RAID 1+0

综合两者特点。

RAID 0+1：先条带化，再对整个条带组做镜像。

RAID 1+0：先组成镜像对，再对镜像对做条带化。

RAID 1+0 通常具有更好的故障容忍能力。

![image-20260610220801169](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610220801169.png)

#### RAID2

[海明码](#校验码)校验 + 条带存储

海明码长度：$2^r≥r+d+1$($r$ 是冗余码位数，$d$ 是数据位数)

![image-20260610221204245](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610221204245.png)

将数据条带化分布于**不同的硬盘上**，使用海明码来提供错误检查及恢复

#### RAID 3

[奇偶校验](#校验码)冗余

![image-20260610221556228](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610221556228.png)

其他等级可以自主了解，这里放出总表：

![image-20260610221947867](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610221947867.png)

---

## 校验码

![image-20260610221344321](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610221344321.png)

![image-20260610221457268](C:\Users\rippor\AppData\Roaming\Typora\typora-user-images\image-20260610221457268.png)