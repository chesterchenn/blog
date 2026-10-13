---
title: 'Arch 安装简易指南'
published: 2026-10-13
tags: ['linux']
---

本文记录 Arch Linux 的简易安装流程。

<!-- vim-markdown-toc GFM -->

- [启动项黑屏处理](#启动项黑屏处理)
- [安装准备](#安装准备)
  - [时间同步](#时间同步)
  - [确认安装硬盘](#确认安装硬盘)
  - [硬盘格式化为 GPT](#硬盘格式化为-gpt)
  - [硬盘分区](#硬盘分区)
  - [设置分区格式](#设置分区格式)
  - [挂载分区](#挂载分区)
  - [编辑镜像源](#编辑镜像源)
- [安装系统](#安装系统)
  - [安装 linux](#安装-linux)
  - [安装重要软件](#安装重要软件)
  - [生成 fstab](#生成-fstab)
  - [切换进新系统](#切换进新系统)
- [系统配置](#系统配置)
  - [配置时间](#配置时间)
  - [本地化设置](#本地化设置)
  - [设置 root 密码](#设置-root-密码)
  - [引导加载程序 GRUB](#引导加载程序-grub)
  - [双系统](#双系统)
  - [退出并重启](#退出并重启)
- [重启之后](#重启之后)
  - [配置网络](#配置网络)
  - [配置环境变量](#配置环境变量)
  - [创建普通用户](#创建普通用户)
  - [使用 archlinuxcn 安装 yay](#使用-archlinuxcn-安装-yay)
  - [安装显卡驱动](#安装显卡驱动)
  - [安装 KDE](#安装-kde)
- [其他](#其他)
- [个性化内容](#个性化内容)
  - [常见的软件](#常见的软件)
  - [安装 zsh](#安装-zsh)
  - [安装配置 tmux](#安装配置-tmux)
  - [安装 neovim](#安装-neovim)

<!-- vim-markdown-toc -->

## 启动项黑屏处理

如果启动时遇到黑屏，按下 `e` 键，在显示的 `archiosbasedir=arch archiossearchuuid=2026-xx-xx` 后面加上 `nomodeset`，代表启动时不加载任何显卡驱动，只用基本的 VESA 模式驱动显示器。

## 安装准备

### 时间同步

设置系统时间同步，防止安装包安全验证失败。

```sh
timedatectl set-ntp true
```

### 确认安装硬盘

确定要安装的硬盘，后续以 `sda` 硬盘为例，使用 `fdisk -l` 查看磁盘容量。

```sh
fdisk -l
```

### 硬盘格式化为 GPT

将硬盘格式化成 GPT 格式，方便安装 UEFI 启动。

```sh
fdisk /dev/sda
```

按下 `g` 创建 GPT 分区表。

### 硬盘分区

根据 [Partitioning - ArchWiki](https://wiki.archlinux.org/title/Partitioning) 的建议划分三个区。

```sh
cfdisk /dev/sda
```

- `/efi` 或 `/boot`：分区 `/dev/sda1`，建议 512M
- `[swap]`：分区 `/dev/sda2`，建议至少 4G
- `/`：分区 `/dev/sda3`，剩余主目录

### 设置分区格式

1. 启动分区 EFI 必须是 FAT 格式。

   ```sh
   mkfs.fat -F 32 /dev/sda1
   ```

2. 创建虚拟内存分区，并开启 swap。

   ```sh
   mkswap /dev/sda2
   swapon /dev/sda2
   ```

3. 创建主目录 ext4 格式的分区（PS：btrfs 貌似挺受欢迎）。

   ```sh
   mkfs.ext4 /dev/sda3
   ```

### 挂载分区

1. 将主目录挂载到 `/mnt` 目录下。

   ```sh
   mount /dev/sda3 /mnt
   ```

2. 将引导分区挂载到 `/mnt/efi` 目录下。

   ```sh
   mount --mkdir /dev/sda1 /mnt/efi
   ```

### 编辑镜像源

切换到国内镜像下载更快。

```sh
vim /etc/pacman.d/mirrorlist
```

将 `Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch/` 放置顶部。

## 安装系统

### 安装 linux

```sh
pacstrap -K /mnt base linux linux-firmware
```

- `-K`：初始化密钥
- `base`：基础包
- `linux`：主线内核
- `linux-firmware`：基本固件

### 安装重要软件

```sh
pacstrap /mnt networkmanager vim sudo amd-ucode/intel-ucode base-devel git konsole
```

- `networkmanager`：联网工具，不然系统无法联网
- `base-devel`：编译 AUR 软件等工具
- `amd-ucode/intel-ucode`：根据 CPU 安装
- `konsole`：终端

### 生成 fstab

生成 fstab 文件持久化系统全局配置文件，使用 `genfstab` 命令，`-U` 生成 UUID。

```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

### 切换进新系统

```sh
arch-chroot /mnt
```

## 系统配置

后续步骤主要是在新系统里面配置东西。

### 配置时间

1. 配置上海时区。

   ```sh
   ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
   ```

2. 系统校准时间。

   ```sh
   hwclock --systohc
   ```

### 本地化设置

1. 保留 `en_US.UTF-8` 和 `zh_CN.UTF-8` 即可。

   ```sh
   vim /etc/locale.gen
   ```

2. 根据 `/etc/locale.gen` 生成本地化文件。

   ```sh
   locale-gen
   ```

3. 设置本地化，填写 `LANG=en_US.UTF-8`，推荐英文 UTF-8。

   ```sh
   vim /etc/locale.conf
   ```

### 设置 root 密码

设置 root 用户密码。

```sh
passwd
```

### 引导加载程序 GRUB

1. grub 是常用的引导程序，efibootmgr 用来管理 EFI 启动项。

   ```sh
   pacman -S grub efibootmgr
   ```

2. 安装 grub。

   ```sh
   grub-install --target=x86_64-efi --efi-directory=/efi
   ```

3. grub 生成配置文件。

   ```sh
   grub-mkconfig -o /boot/grub/grub.cfg
   ```

### 双系统

1. os-prober 用来搜索其他系统，exfat-utils 找到 windows 的 EFI 分区。

   ```sh
   pacman -S os-prober exfat-utils
   ```

2. 编辑 grub 配置文件，取消注释 `GRUB_DISABLE_OS_PROBER=false`，允许启动搜索其他系统。

   ```sh
   vim /etc/default/grub
   ```

3. grub 生成配置文件。

   ```sh
   grub-mkconfig -o /boot/grub/grub.cfg
   ```

### 退出并重启

执行 `exit` 和 `reboot` 命令。

```sh
exit
reboot
```

## 重启之后

### 配置网络

```sh
systemctl enable --now NetworkManager
```

### 配置环境变量

1. 编辑环境变量文件。

   ```sh
   vim /etc/environment
   ```

2. 输入 `EDITOR=vim` 设置默认编辑工具，可能需要重启使得环境变量生效。

### 创建普通用户

1. 创建普通用户。

   ```sh
   useradd -mG wheel [username]
   ```

2. 修改密码。

   ```sh
   passwd [username]
   ```

3. 执行 `visudo`，编辑去掉 `%wheel ALL=(ALL:ALL) ALL` 的注释，即可赋予普通用户执行 sudo 权限。

   ```sh
   visudo
   ```

### 使用 archlinuxcn 安装 yay

1. 在 `/etc/pacman.conf` 末尾添加以下内容。

   ```sh
   vim /etc/pacman.conf
   ```

   ```ini
   [archlinuxcn]
   Server = https://repo.archlinuxcn.org/$arch
   ```

2. 执行 `pacman -Syu archlinuxcn-keyring`，再执行 `pacman -Syu yay`。

   ```sh
   pacman -Syu archlinuxcn-keyring
   pacman -Syu yay
   ```

### 安装显卡驱动

1. 确认安装使用的内核头文件。

   ```sh
   pacman -S --needed linux-headers
   ```

2. 参照 [Installation guide - ArchWiki](https://wiki.archlinux.org/title/Installation_guide) 确定安装的显卡驱动，如 750Ti 安装 `yay -Syu nvidia-580xx-dkms`。

3. 添加内核参数。

   ```sh
   vim /etc/default/grub
   ```

   添加 `GRUB_CMDLINE_LINUX="nvidia_drm.modeset=1"`。

### 安装 KDE

1. 安装 plasma。

   ```sh
   pacman -Syu plasma-meta
   ```

2. 安装 sddm。

   ```sh
   pacman -Syu sddm sddm-kcm
   ```

3. 开机自启。

   ```sh
   sudo systemctl enable sddm.service
   ```

4. 立即启动。

   ```sh
   sudo systemctl start sddm.service
   ```

## 其他

- 释放 `/etc/pacman.conf` 下的 `Color` 注释，可以让日志颜色更丰富。
- 安装成功后启动显示黑屏，则需要按 `e` 编辑。

## 个性化内容

### 常见的软件

```sh
pacman -Syu fcitx5-im noto-fonts-cjk firefox openssh dolphin kate
```

- `fcitx5-im`：输入法
- `noto-fonts-cjk`：中文字体
- `openssh`：ssh
- `dolphin`：文件管理器
- `kate`：文本编辑
- `neovim`：编辑器

### 安装 zsh

安装 zsh、oh-my-zsh 以及 zshrc 配置。

```sh
pacman -Syu zsh
```

执行指令切换默认 shell。

```sh
chsh -s $(which zsh)
```

安装 oh-my-zsh。

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

如果存在自定义的 zshrc 配置。

```sh
cp zshrc ~/.zshrc
```

### 安装配置 tmux

```sh
pacman -Syu tmux
```

安装插件管理 TPM。

```sh
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

如果存在自定义的 tmux 配置，复制 tmux.conf。

```sh
cp tmux.conf ~/.tmux.conf
```

重新加载配置。

```sh
tmux source ~/.tmux.conf
```

使用 `prefix + I`（大写）进行插件的安装。

### 安装 neovim

```sh
pacman -Syu neovim
```

如果存在自定义 nvim 配置。

```sh
cp -rf nvim ~/.config/
```